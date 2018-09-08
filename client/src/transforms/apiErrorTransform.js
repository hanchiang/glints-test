
export default function apiErrorTransform(error) {
  if (error.response) {
    throw new Error(error.response.data.error.message);
  } else if (error.request) {
    throw new Error(error.request)
  } else {
    throw new Error(error.message)
  }
}