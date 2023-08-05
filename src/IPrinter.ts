export interface IPrinter {
  /**
   * Writes the data to a file with a dynamically generated filename based on the current date and time.
   * The data can be either a string or an array of strings, each representing a line in the file.
   * If the data is a string, it will be written as-is to the file.
   * If the data is an array, each element will be written as a separate line in the file.
   *
   * @returns {void}
   */
  printData: () => void;

  /**
   * Generates a formatted filename based on the current date and time.
   *
   * @returns {string} The generated filename.
   *
   * @example
   * // Returns "stack_05-08-2023_15-30.txt" (assuming current date and time is 2023-08-05 15:30).
   * const filename = getFileName();
   */
  getFileName: () => string;
}
