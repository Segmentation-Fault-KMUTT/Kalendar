import { useState } from "react";
import Button from "./Component/Button";
import Form from "./Component/Form";
import Input from "./Component/Input";
import { Modal } from "./Component/Modal";
import { useKeyValue } from "./helper";

const mykeys = ["id", "password"];

const useMyModalForm = () => {
  const form = useKeyValue(mykeys);

  const enabledSubmit = () => {
    const idCheck = form.getValue("id").toString().length >= 8;
    const passwordCheck = form.getValue("password").toString().length >= 8;
    return idCheck && passwordCheck;
  };

  return { form, enabledSubmit };
};

const ExportModal = ({ message /* test props */ }: { message: string }) => {
  const [showModal, setShowModal] = useState(false);
  const { form, enabledSubmit } = useMyModalForm();

  const onSubmit = async () => {
    console.log(form.getValue("id").toString(), form.getValue("password").toString());
    setShowModal(false);
  };

  const toggleModal = (show: boolean) => {
    setShowModal(show);
  };

  return (
    <div className="pt-5">
      <div>
        <Button
          color="blue3"
          onClick={() => {
            setShowModal(true);
          }}>
          Open Modal
        </Button>
      </div>
      {
        <Modal
          close={() => {
            /* try not to directly pass a setState function. ! 
          Instead, we pass a custom setState function.
        */
            toggleModal(false);
          }}
          title="Preview"
          show={showModal}
          disabledDone={!enabledSubmit()}
          onDone={onSubmit}>
          <div>
            <div>{message}</div>
            <div>
              <Form onSubmit={onSubmit} enabledSubmit={enabledSubmit()}>
                <div className="pt-2">
                  <div className="pt-2">
                    <Button
                      color="blue3">
                      PDF Download
                    </Button>
                  </div>
                  <div className="form-check form-switch">
                  <Input
                      type="text"
                      icon="far fa-file"
                      placeholder="File name"
                      value={form.getValue("id") as string}
                      onChange={(value) => {
                        form.updateValue("id", value);
                      }}
                    />
                  </div>
                  
                  <div>
                    {/* submit button required for submitting through enter/return key */}
                    <Button type="submit"></Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </Modal>
      }
    </div>
  );
};

export default ExportModal;