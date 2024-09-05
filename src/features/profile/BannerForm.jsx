import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Button } from "../../components/Button";
import ImageUploader from "../../components/ImageUploader";
import Modal from "../../components/Modal";
import { toBase64 } from "../../utils/helperFn";
import useUpdateBanner from "./hooks/useUpdateBanner";

const bannerSchema = Yup.object({
  bannerBase64: Yup.string().required("Image is required"),
});

const BannerForm = () => {
  const { isloading, updateBannerAction } = useUpdateBanner();

  const handleFormSubmit = async (values, onCloseModal) => {
    try {
      if (values.bannerBase64) {
        values.bannerBase64 = await toBase64(values?.bannerBase64);
      }
      await updateBannerAction(values);
    } catch (error) {
      console.log(error);
    } finally {
      onCloseModal();
    }
  };

  return (
    <Modal>
      <Modal.Open opens="uploadBanner">
        <Modal.Button title="Upload Banner" className="w-fit" />
      </Modal.Open>
      <Modal.Window name="uploadBanner">
        {({ onCloseModal }) => (
          <div className="flex items-center justify-center bg-primary-background p-4">
            <div className="w-full max-w-lg rounded-lg bg-primary-background">
              <h2 className="font-B mb-2 font-Baloo text-xl font-normal text-black sm:text-2xl md:text-3xl lg:text-4xl">
                Upload banner
              </h2>

              <Formik
                enableReinitialize
                initialValues={{
                  bannerBase64: "",
                }}
                validationSchema={bannerSchema}
                onSubmit={(value) => handleFormSubmit(value, onCloseModal)}
              >
                {({ errors, touched, values, setFieldValue }) => (
                  <Form>
                    <div className="mb-4">
                      <ImageUploader
                        value={values?.bannerBase64}
                        onChangeImage={(value) =>
                          setFieldValue("base64", value)
                        }
                      />
                      {errors.base64 && touched.base64 ? (
                        <span className="text-red-500">Image is required</span>
                      ) : null}
                    </div>
                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        disabled={isloading}
                        title="Upload"
                        className="bg-primary hover:bg-primary-dark focus:ring-primary-500 !w-fit rounded-md px-4 py-2 font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50"
                      />
                      <Modal.Close>
                        <Modal.Button variant="cancel" title="No, Close" />
                      </Modal.Close>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}
      </Modal.Window>
    </Modal>
  );
};

export default BannerForm;
