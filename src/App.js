import './App.css';
import { Navbar } from './components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//faCircleCheck green
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
// fa-upload
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faInfo } from '@fortawesome/free-solid-svg-icons';
// fa-circle-xmark red
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
// fa-circle-check green
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
// <i class="fa-solid fa-file-circle-check"></i>
import { faFileCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import Dropdown from 'react-bootstrap/Dropdown';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
const link = "https://9ss5qg1atj.execute-api.eu-west-1.amazonaws.com/smartbuy/csvmaster";
const res = {
  meta: {
    status: "success",
    message: "20 products uploaded sucessfully." //message from backend
  },
  data: {
    erroredProducts: [
      {
        source_product_id: "test product",
        source_system_code: "IOM",
        legal_entity_code: "SA02",
        profit_centre: "xyz",
        processStatus: "error",
        reason: "legalEntity"
      }
    ]
  }
}

function App() {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const [showModel, setShowMOdel] = useState(false);
  const [modelError, setModelError] = useState("");
  const [inProgressShow, setInProgressShow] = useState(false);
  const [file, setFile] = useState("");
  const [fileStatus, setFileStatus] = useState("File uploading progress...");
  const [env, setEnv] = useState("Select the Environment");
  const [fileuploadingInput, setFileuploadingInput] = useState(true);
  const [response, setResponse] = useState(res);
  // form hit funtion
  async function formSubmit() {
    let e = document.querySelector(".input-field");
    // Content-Type
    const config = {
      headers:{
        "x-api-key":"hd5ykvbeg2kfv9669w865zhnwqagzobakht0x6ac",
        "X-OH2-DEBUGGING":true,
        "X-APPSMITH-SIGNATURE":"aaa"
      }
    };
    await axios.post(link, {
      file: e.files[0]
    },config).then((res) => {
      console.log(res);
      setResponse(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleChange() {
    let e = document.querySelector(".input-field");
    if (e.files) {
      setFile(e.files[0].name);
      // remove
      document.querySelector(".file-name").classList.remove("invisible");
      document.querySelector(".file-name").classList.add("visible");
    }
  }

  // onchange = (e) => {
  //   console.log(e.target.value);
  //   e.preventDefault();
  //   handleChange();
  // }
  function cancelTheUpload(e) {
    e.preventDefault();
    setShow(false);
    setFile("");
    setFileuploadingInput(true)
    if (document.querySelector(".file-name")) {
      if (document.querySelector(".file-name").classList.contains("visible")) {
        document.querySelector(".file-name").classList.remove("visible");
        document.querySelector(".file-name").classList.add("invisible");
      }
    }
    // document.querySelector(".file-name").classList.remove("visible");
    // document.querySelector(".file-name").classList.add("invisible");
    // document.querySelector(".input-field").value = "";
  }

  function fileuploading(e) {
    if (env === "Select the Environment") {
      setModelError("Please select the Environment");
      showErrorModel();
    }
    else if (file === "") {
       setModelError("Please select the file");
      showErrorModel();
      
    }
    else {
      setProgress(0);
      formSubmit();
      e.preventDefault();
      setInProgressShow(true);
      let i = 0;
      const prog = setInterval(() => {
        setProgress(i + 10);
        i += 10;
      }, 1000);
      setFileuploadingInput(false);
      setFileStatus("File uploading in progress...");
      setTimeout(() => {
        clearInterval(prog);
        setInProgressShow(false);
        setShow(true);
        setProgress(100);
        setFileStatus("File uploaded successfully");
      }, 10000);
    }
  }
  // show model
  function showErrorModel() {
    setShowMOdel(true);
  }
  // hide model
  function hideErrorModel() {
    setShowMOdel(false);
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Modal show={showModel} onHide={hideErrorModel}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modelError}</Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={hideErrorModel}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='spacer'>
      </div>
      <div className="container">
        <h5 className='col-md-12 mt-5 ms-5'>Import Reference Data By .CSV</h5>
        <div className='col-md-12 d-flex'>
          <div className='mt-5'>
            <FontAwesomeIcon icon={faCircleCheck} className='click-Circle-Ok' />
            <div className='line-connect'></div>
            <FontAwesomeIcon icon={faCircleCheck} className='click-Circle-Ok' />
            <div className='line-connect'></div>
            <FontAwesomeIcon icon={faCircleCheck} className='click-Circle-Ok' />
          </div>

          <div className='col-md-12 mt-5 ms-5'>
            <div className='d-flex '>
              <div className='header-numberer'>
                <span>1</span>
              </div>
              <div className='ms-2'>
                <div>
                  <span><strong>Create</strong> a CSV Reference data (including products) to upload</span>
                </div>
              </div>
            </div>
            <div className='Horizontal-line '> </div>
            <div className='textibe-line'>
              <span>Download a <a href='./template-reference-data.csv'>sample CSV template</a> to see an example of the format required</span>
            </div>
            <div className='d-flex second-element'>
              <div className='header-numberer'>
                <span>2</span>
              </div>
              <div className='ms-2'>
                <div>
                  <span>Specify the environment</span>
                </div>
              </div>
            </div>
            <div className='Horizontal-line'> </div>
            <div class="drop-down-env-seletor">
              <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                  <span className='selected-env'> {env} </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setEnv("DEV")}>DEV</Dropdown.Item>
                  <Dropdown.Item onClick={() => setEnv("UAT")} >UAT</Dropdown.Item>
                  <Dropdown.Item onClick={() => setEnv("PROD")}>PROD</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className='d-flex third-element'>
              <div className='header-numberer'>
                <span>3</span>
              </div>
              <div className='ms-2 d-flex'>
                <div>
                  <span>Please <strong>upload</strong> the csv containing your Reference data (including products)  </span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faInfo} size="2xs" className='info-icon' />
                </div>
              </div>
            </div>
            <div className='Horizontal-line'> </div>
            {
              inProgressShow && !show ?
                <div className='col-md-12'>
                  <div className='card uploading-progress col-md-5'>
                    <div className='justify-content-center d-flex'>
                      <span >{fileStatus}</span>
                    </div>
                    <div className='mt-2 progress-width'>
                      <ProgressBar striped variant="info" now={progress} className="progress-bar" />
                    </div>
                  </div>
                </div>
                : null
            }
            {
              fileuploadingInput ?
                <div className='d-flex col-md-12'>
                  <div className='col-md-5'>
                    <form className='crusser-form' onClick={(e) => {
                      document.querySelector(".input-field").click();
                    }}>
                      <input type="file" className="input-field" hidden onChange={handleChange} />
                      <div className="upload-btn-wrapper card">
                        <div className='center-items'>

                          <FontAwesomeIcon icon={faUpload} className='upload-icon' />
                          <span className='mt-2'>Select a CSV file to import</span>
                          <span className='text-muted'>or drag and drop here</span>
                          <span className='file-name invisible'>
                            <FontAwesomeIcon icon={faFileCircleCheck} /> <strong>{file}</strong></span>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div>

                  </div>
                </div> : null
            }
            {show ?
              <div className='col-md-12'>
                <div className='card uploading-progress col-md-5'>
                  <div className='justify-content-center d-flex'>
                    <span >{fileStatus}</span>
                  </div>
                  <div className='mt-2 progress-width'>
                    <ProgressBar striped variant="info" now={progress} className="progress-bar" />
                  </div>
                </div>
              
                <div className='ms-5 col-md-12 mt-2'>
                  {
                    !inProgressShow && response.data?.erroredProducts.length>0 ?
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Error Summary</th>
                          </tr>
                          <tr align='centre'>
                            {
                               Object.keys(response.data.erroredProducts[0]).map((item) => {
                                return (
                                  <th>{item}</th>
                                )
                              })
                            }
                          </tr>
                        </thead>
                        <tbody>
                          {
                            response.data.erroredProducts.map((item) => {
                              return (
                                <tr>
                                  {
                                    Object.values(item).map((value) => {
                                      return (
                                        <td>{value}</td>
                                      )
                                    })
                                  }
                                </tr>
                              )
                            })
                          }

                        </tbody>
                      </Table> : null
                  }

                </div>
              </div>
              : null
            }

            <div className='Horizontal-line-end'> </div>
            <div className='d-flex fourth-element '>
              <a className="help-ancher">Need help importing your reference data</a>
              <div className='d-flex ms-5'>
                <button className='custom-btn' onClick={(e) => cancelTheUpload(e)} >Cancel</button>
                <button className='custom-btn-upload-continue' onClick={(e) => fileuploading(e)}>Upload and continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
