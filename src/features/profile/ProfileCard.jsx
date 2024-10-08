import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../../components/Input";
import Spinner from "../../components/Spinner";
import useGetMe from "./hooks/useGetMe";
import useUpdateMe from "./hooks/useUpdateMe";

// Define validation schema
const profileSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Invalid phone number")
    .required("Phone number is required"),
});

function ProfileCard() {
  const { data, isPending, error } = useGetMe();
  const { isloading, updateMeAction } = useUpdateMe();
  const {
    name,
    email: userEmail,
    phoneNumber: phoneNumber,
    username: userName,
  } = data || {};

  const handleFormSubmit = (value) => {
    updateMeAction(value);
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 dark:bg-gray-900">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 dark:bg-gray-900">
        <div className="text-center text-lg text-red-500 dark:text-red-300">
          Failed to load profile. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="transform overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-900">
          <h1 className="mb-1 text-3xl font-semibold text-gray-900 dark:text-gray-100">
            {name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            @{userName}
          </p>
        </div>

        <Formik
          enableReinitialize
          initialValues={{
            name: name ?? "",
            email: userEmail ?? "",
            phoneNumber: phoneNumber ?? "",
            username: userName ?? "",
          }}
          validationSchema={profileSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched, values, handleChange, handleSubmit }) => (
            <Form>
              <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
                <div className="space-y-4">
                  <Input
                    name="name"
                    label="Name"
                    value={values?.name}
                    handleChange={handleChange}
                    handleBlur={handleSubmit}
                    error={errors.name && touched.name ? errors.name : ""}
                    disabled
                  />
                  <Input
                    name="username"
                    label="Username"
                    value={values?.username}
                    handleBlur={handleSubmit}
                    error={
                      errors.username && touched.username ? errors.username : ""
                    }
                    handleChange={handleChange}
                    disabled
                  />
                </div>
                <div className="space-y-4">
                  <Input
                    label="Email"
                    handleChange={handleChange}
                    handleBlur={handleSubmit}
                    error={errors.email && touched.email ? errors.email : ""}
                    value={values?.email}
                    name="email"
                    disabled
                  />
                  <Input
                    name="phoneNumber"
                    handleBlur={handleSubmit}
                    error={
                      errors.phoneNumber && touched.phoneNumber
                        ? errors.phoneNumber
                        : ""
                    }
                    label="Phone Number"
                    handleChange={handleChange}
                    value={values?.phoneNumber}
                    disabled={isloading}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ProfileCard;
