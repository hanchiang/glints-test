const papa = require('papaparse');
const axios = require('axios');
const _ = require('lodash');
const slug = require('slug');

const db = require('../db');

const re = /([^0-9]*)\s(\d+\s\w+|\d+:\d+\s\w+)\s-\s(\d+\s\w+|\d+:\d+\s\w+)/;
const mapDaysToInt = {
	'Mon': 0,
	'Tue': 1,
	'Wed': 2,
	'Thu': 3,
	'Fri': 4,
	'Sat': 5,
	'Sun': 6
};

// Helper function to handle day range
// dayRangeString: string
//   e.g. Mon-Sat
// Returns an array of days int
function handleDayRange(dayRangeString) {
	const [fromDay, toDay] = dayRangeString.split('-')
	const result = [];
	let value = mapDaysToInt[fromDay];

	for (i = 0; i < mapDaysToInt[toDay] - mapDaysToInt[fromDay] + 1; i++) {
		result.push(value);
		value++;
	}
	return result;
}

// Helper function to parse days
// daysString: string.
//   e.g. Mon-Thu | Mon-Thu, Sun | Mon, Thu-Sun
// Returns an array of days int
//   e.g [0, 1, 2, 3] | [0, 1, 2, 6] | [0, 3, 6]
function formatDays(daysString) {
	let result = [];

	// Check whether there is more than 1 day range
	const days = daysString.split(',').map(day => day.trim());
	for (day of days) {
		if (day.includes('-')) {
			result = [...result, ...(handleDayRange(day))];
		} else {
			result.push(mapDaysToInt[day]);
		}
	}
	return _.sortBy(result);
}

// Helper function to format time
function formatTimeHelper(timeString, amPm, isToTime) {
	let result;

	result = parseInt(timeString.replace(':', ''));
	// 9 -> 900, 9:30 -> 930
	if (!timeString.includes(':')) {
		result *= 100;
	}
	// If toTime hits the next day, add 12 hours if it is between 12.00am to 12.59am
	// add 24 hours if it is between 1am to 11.59am
	else if (isToTime && amPm === 'am') {
		if (result >= 1200 && result <= 1259) {
			result += 1200;
		} else {
			result += 1200 * 2;
		}
	}
	// If start time is between 12am to 12.59am
	else if (!isToTime && amPm === 'am' && result >= 1200 && result <= 1259) {
		result -= 1200;
	}

	// If time is between 1pm to 11.59pm
	else if (amPm === 'pm' && (result >= 100 && result <= 1159)) {
		result += 1200;
	}
	return result;
}

// fromTimeString = toTimeString: e.g. 11:30 am | 11 am || 11 pm || 11:30 pm
// Returns an array of int in the form [fromTime, toTime]
function formatTime(fromTimeString, toTimeString) {
	const [fromTime, fromAmPm] = fromTimeString.split(' ');
	const [toTime, toAmPm] = toTimeString.split(' ');

	return [
		formatTimeHelper(fromTime, fromAmPm, false),
		formatTimeHelper(toTime, toAmPm, true)
	];
}

// Helper function to parse timeslots for a store
// timeslotString: string.
//   e.g. Mon-Thu, Sun 11:30 am - 9 pm  / Fri-Sat 11:30 am - 9:30 pm
// Returns an array of timeslot
//   e.g. [{days: [0, 1, 2, 6], time: [1100, 1230]}, {days: [2,3,5], time: [1000, 2333]}]
function formatDateTime(timeslotString) {
	const results = [];
	// Check whether there is more than 1 timeslot block
	const timeslots = timeslotString.split('/');
	for (timeslot of timeslots) {
		const match = timeslot.trim().match(re);
		const [_, days, fromTime, toTime] = match;

		const result = {};
		result.days = formatDays(days);
		result.time = formatTime(fromTime, toTime);
		results.push(result);
	}
	return results;
}

// stores: parsed JSON from papa parse
function formatData(stores) {
	const results = [];
	let slugRegex;

	for (store of stores) {
		const result = {};
		const [name, timeslot] = store;
		result.name = name;
		result.timeslots = formatDateTime(timeslot);

		// add slug
		const storeSlug = slug(result.name);
		slugRegex = new RegExp(`${storeSlug}(-\d+)?`);

		const sameSlugs = results.filter(result => {
			return result.slug && result.slug.match(slugRegex);
		});
		if (sameSlugs.length > 0) {
			result.slug = storeSlug + '-' + (sameSlugs.length + 1);
		} else {
			result.slug = storeSlug;
		}

		results.push(result);
	}
	// console.log(results);
	return results;
}

async function importData() {
	const num = await db.get().collection('stores').countDocuments();
	if (num === 0) {
		console.log('No documents in stores. Importing data...');

		axios.get('https://gist.githubusercontent.com/seahyc/7ee4da8a3fb75a13739bdf5549172b1f/raw/2a8f405af936ca316ca20dd08f349560ceae5938/hours.csv')
			.then(async res => {
				const parsed = papa.parse(res.data, { skipEmptyLines: true }).data;
				const result = formatData(parsed);
				await db.get().collection('stores').insertMany(result);
				console.log('data loaded');
			})
			.catch(err => {
				console.log(err);
				throw err;
			})
	} else {
		console.log('Data already loaded in database');
	}
}

module.exports = importData;
