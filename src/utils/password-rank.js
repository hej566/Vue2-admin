const passwordLengthBenchmark = password => {
  if (password.length <= 4 && password.length >= 1) {
    return 5;
  } else if (password.length >= 5 && password.length <= 7) {
    return 10;
  } else if (password.length >= 8) {
    return 25;
  } else {
    return 0;
  }
};

const passwordAlphabetBenchmark = password => {
  let alphabet = 0;
  let alphabetUppercase = 0;
  let alphabetLowercase = 0;
  const regUppercase = /[A-Z]/;
  const regLowercase = /[a-z]/;

  for (let letter of password) {
    if (regUppercase.test(letter)) {
      alphabetUppercase += 1;
    } else if (regLowercase.test(letter)) {
      alphabetLowercase += 1;
    }
  }

  alphabet = alphabetLowercase + alphabetUppercase;

  if (alphabet === 0) {
    return 0;
  } else if (alphabet === alphabetLowercase || alphabet === alphabetUppercase) {
    return 10;
  } else {
    return 20;
  }
};

const passwordNumberBenchmark = password => {
  let number = 0;
  const reg = /[0-9]/;
  for (let letter of password) {
    if (reg.test(letter)) {
      number += 1;
    }
  }

  if (number === 0) {
    return 0;
  } else if (number >= 1 && number <= 2) {
    return 10;
  } else {
    return 20;
  }
};

const passwordSymbolBenchmark = password => {
  let symbol = 0;
  const reg = /[^a-zA-Z0-9]/;
  for (let letter of password) {
    if (reg.test(letter)) {
      symbol += 1;
    }
  }

  if (symbol === 0) {
    return 0;
  } else if (symbol === 1) {
    return 10;
  } else {
    return 25;
  }
};

const passwordBonusesBenchmark = password => {
  if (
    passwordAlphabetBenchmark(password) === 20 &&
    passwordNumberBenchmark(password) >= 10 &&
    passwordSymbolBenchmark(password) >= 10
  ) {
    return 10;
  } else if (
    passwordAlphabetBenchmark(password) === 10 &&
    passwordNumberBenchmark(password) >= 10 &&
    passwordSymbolBenchmark(password) >= 10
  ) {
    return 5;
  } else if (
    passwordAlphabetBenchmark(password) >= 10 &&
    passwordNumberBenchmark(password) >= 10
  ) {
    return 2;
  }
  return 0;
};

export default password => {
  const standards = [
    passwordLengthBenchmark,
    passwordAlphabetBenchmark,
    passwordNumberBenchmark,
    passwordSymbolBenchmark,
    passwordBonusesBenchmark
  ];
  const benchmarks = standards.map(standard => {
    return standard(password);
  });
  return benchmarks.reduce((accu, current) => {
    return accu + current;
  }, 0);
};
