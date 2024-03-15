import { useState } from "react";
import { Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Label, Button, Alert} from "reactstrap";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function App() {
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(true);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [field, setField] = useState({
    smoking: "",
    fatigue: "",
    wheezing: "",
    coughing: "",
    shortness_of_breath: "",
    swallowing_difficulty: "",
    chest_pain: "",
    chronic_disease: ""
  }); // Data features

  const toggle = () => setOpen(!open);
  const changeUnmountOnClose = (e) => {
    let { value } = e.target;
    setClose(JSON.parse(value));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setField({ ...field, [name]: value });
  };

  const predict = async(e) => {
    e.preventDefault();

    try {
      // Model API
      const response = await axios.post(`${apiUrl}/api/v1/predict/`, field);

      if(response.data.predicted == 1) {
        setResult(<Alert color="danger">Predicted : YES</Alert>);
      } else {
        setResult(<Alert color="primary">Predicted : NO</Alert>);
      }
      setError('');
      
    } catch(error) {
      setError(<Alert color="warning">Select Yes / No</Alert>);
      setResult('');
    }
  }

  return (
    <div>
      <div className="text-center mt-3">
        <h1 style={{fontFamily: 'monospace', fontWeight: 'bold'}}>Do you have a lung problem</h1>
        <Button color="primary" onClick={toggle}>Predict</Button>
      </div>
      <Modal isOpen={open} returnFocusAfterClose={close}>
        <ModalHeader toggle={toggle}>Predict lung cancer</ModalHeader>
        <ModalBody>
          <Form onSubmit={predict}>
            <FormGroup>
              <Label for="smoking">Smoking</Label>
              <Input type="select" name="smoking" value={field.smoking} onChange={handleInput}>
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="fatigue">Fatigue</Label>
              <Input type="select" name="fatigue" value={field.fatigue} onChange={handleInput}>
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="wheezing">Wheezing</Label>
              <Input type="select" name="wheezing" value={field.wheezing} onChange={handleInput}>
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="coughing">Coughing</Label>
              <Input type="select" name="coughing" value={field.coughing} onChange={handleInput}>
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="shortness_of_breath">Shortness of breath</Label>
              <Input type="select" name="shortness_of_breath" value={field.shortness_of_breath} onChange={handleInput}>
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="swallowing_difficulty">Swallowing difficulty</Label>
              <Input type="select" name="swallowing_difficulty" value={field.swallowing_difficulty} onChange={handleInput}>
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="chest_pain">Chest pain</Label>
              <Input type="select" name="chest_pain" value={field.chest_pain} onChange={handleInput}>
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="chronic_disease">Chronic disease</Label>
              <Input type="select" name="chronic_disease" value={field.chronic_disease} onChange={handleInput}>
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Input>
            </FormGroup>
            <Button color="danger">Submit</Button>
            <div className="mt-3">
              {error && <p>{error}</p>}
              {result && <p>{result}</p>}
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
