/**
 * Represents a utility interface for displaying data and saving data to files.
 */
export interface IPrinter {
  /**
   * Displays provided data to the console.
   * @param data - The data to be displayed. Can be a single string or an array of strings.
   */
  displayToConsole(data: string | Array<string>): void;

  /**
   * Saves the provided data to a file.
   * @param data - The data to save. Can be a single string or an array of strings.
   */
  saveToFile(data: string | Array<string>): void;

  /**
   * Generates a file name based on the current date and time.
   * @returns The generated file name.
   */
  generateFileName(): string;
}
