export const runAfterDelay = (callback: () => void, ms: number): void => {
  setTimeout(() => {
    callback();
  }, ms);
};
