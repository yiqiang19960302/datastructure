async function retry(fn, retries = 3, delay = 1000) {
  let attempts = 0;

  const execute = async () => {
    try {
      return await fn();
    } catch (error) {
      if (attempts < retries) {
        attempts++;
        console.log(`Attempt ${attempts} failed. Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return execute();
      } else {
        throw error;
      }
    }
  };

  return execute();
}

// how about using iterative way to write retry function
async function iterativeRetry(fn, retries = 3, delay = 1000) {
  let attempts = 0;

  while (attempts < retries) {
    try {
      return await fn();
    } catch (error) {
      attempts++;
      if (attempts < retries) {
        console.log(`Attempt ${attempts} failed. Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}
