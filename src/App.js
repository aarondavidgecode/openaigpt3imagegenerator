import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";
import { ReactComponent as Logo } from './openai.svg';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Form, FormGroup, Label, Input } from 'reactstrap';

import ReactSlider from "react-slider";


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Spinner,

} from 'reactstrap';

import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const [placeholder, setPlaceholder] = useState(
    "Describe the image you want to generate.."
  );

  const configuration = new Configuration({

    apiKey: "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",
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setLoading(false);
    setResult(res.data.data[0].url);
    console.log(JSON.stringify(res.data.data));


  };

  return (

    <div className="app-main" id="home">
      <Navbar className="sticky-top">
        <NavbarBrand href="/">
          <Logo className="logo" />
          OpenAI-Image-Generator</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>

      <h2>Generate an Image using Open AI's <strong>DALL-E 2 API</strong></h2>

      <div className="container-sm">

        {loading ? (
          <>
            <h3>Generating..Please wait..</h3>
            <Spinner color="primary" type="grow">
            </Spinner>
            <span>
              {' '}Loading
            </span>
            <div class="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </>
        ) : (
          <>
            <div className="options">
              <p><b>Directions:</b> Enter A text description of the desired images. The maximum length is 1000 characters.</p>
              <label><b>Choose Image Size: </b></label>
              <Form >
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" /> 256 x 256
                  </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" /> 512 x 512
                  </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" /> 1024 x 1024
                  </Label>
                </FormGroup>
                <br></br>
                <label><b>Choose Number of Different Images to Generate: </b></label>
                <ReactSlider
                  className="horizontal-slider"
                  thumbClassName="example-thumb"
                  trackClassName="example-track"
                  renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                />
              </Form>
            </div>
            <textarea
              className="app-input"
              placeholder={placeholder}
              onChange={(e) => setPrompt(e.target.value)}

            />

            <button className=
              "form-control btn btn-primary " onClick={generateImage}>Submit</button>
            {result.length > 0 ? (
              <img className="result-image" src={result} alt="result" />


            ) : (
              <>
                <p class="placeholder-glow" >
                  <span class="placeholder col-12" ></span>
                </p>

              </>
            )}
          </>
        )}
      </div>
      <MDBFooter className='text-center' color='white' >
        <MDBContainer className='p-4'>
          <section className='mb-4'>
            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>

            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='twitter' />
            </MDBBtn>

            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='google' />
            </MDBBtn>

            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='instagram' />
            </MDBBtn>

            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='linkedin-in' />
            </MDBBtn>

            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='github' />
            </MDBBtn>
          </section>

          <section className=''>
            <form action=''>
              <MDBRow className='d-flex justify-content-center'>
                <MDBCol size="auto">
                  <p className='pt-2'>
                    <strong>Sign up for our newsletter</strong>
                  </p>
                </MDBCol>

                <MDBCol md='5' start>
                  <MDBInput contrast type='email' label='Email address' className='mb-4' />
                </MDBCol>

                <MDBCol size="auto">
                  <MDBBtn outline color='light' type='submit' className='mb-4'>
                    Subscribe
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </form>
          </section>

          <section className='mb-4'>
            <p>
              <b>OpenAI’s</b> mission is to ensure that artificial general intelligence (AGI)—by which we mean highly autonomous systems that outperform humans at most economically valuable work—benefits all of humanity.
            </p>
          </section>
        </MDBContainer>

        <div className='text-center p-3' style={{ backgroundColor: "yellow", color: "black", border: "1px solid black", }}>
          © 2023 Copyright:
          <a className='text-dark' href='https://mdbootstrap.com/'>
            geaux2consulting.com <Logo className="logo" />
          </a>
        </div>
      </MDBFooter>
    </div>

  );
}

export default App;