import * as Yup from "yup";

export const blogPostValidationSchema = Yup.object({
  title: Yup.string().required("This is a required field"),
  content: Yup.string().required("This is a required field"),
});
