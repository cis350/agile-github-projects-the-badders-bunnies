export interface Question {
  _id: string;  // Assuming _id is provided by MongoDB.
  questionText: string;
  answer?: string;  // `answer` is optional since `required` is set to false in the schema.
  author: string;
}
