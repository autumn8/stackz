function logError(error: Error) {
  // send to something like bugsnag or internal error logging service.
  console.error(error);
}

export { logError };
