
export default function apiErrorTransform(error) {
  if (error.response) {
    throw new Error(error.response.data.error.message);
  } else if (error.request) {
    throw new Error('Unable to connect to the server');
  } else {
    throw new Error(error.message)
  }
}