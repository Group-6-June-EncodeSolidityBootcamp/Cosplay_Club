import './App.css';
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "./components/Image";
import contractABI from "./assets/contestABI";
const CONTRACT_ADDRESS = "0xa05AD8C8FA9252626bcA667107E4e8eA6581bff0";

function App() {

  const [NFTs, setNFTs] = useState([]);
  const [status, setStatus] = useState("Loading...");

  const startApp = async () => {
    let provider = ethers.getDefaultProvider('goerli');
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
    console.log("Contract address:", contract.address);

    // Get total tokens
    const totalSubmissions = await contract.totalSubmissions();
    console.log('Total Tokens is ', totalSubmissions.toString());

    // Get All NFTs
    const tokenURIs = [];
    setStatus("Getting Tokens from contract...");
    console.log("Getting Tokens from contract...");
    for (let i = totalSubmissions - 1; i >= 0; i -= 1) {
      const tokenURI = await contract.tokenURI(i);
      console.log(`Token id: ${i} | Token URI: ${tokenURI}`);
      tokenURIs.push(tokenURI);
    }

    // Get NFT Datas
    const tokenDatas = [];
    setStatus("Getting Token Data...");
    const promises = [];
    tokenURIs.forEach((tokenURI) => {
      promises.push(fetch(tokenURI));
    })
    Promise.all(promises)
      .then(responses => Promise.all(
        responses.map(
          response => response.json()
        ))
        .then(jsons => jsons.forEach(
          json => {
            tokenDatas.push(json);
          })))
      .then(() => {
        setNFTs(tokenDatas);
        setStatus("");
      })
      .catch(err => console.log('error', err));
  };

  useEffect(() => {
    startApp();
  }, []);

  return (
    <div STYLE="background-position: 0 -60px;">
      <nav className="navbar navbar-dark navbar-expand-md fixed-top navbar-shrink py-3" id="mainNav" STYLE="padding: 4px !important;">
          <div className="container"><a className="navbar-brand d-flex align-items-center" href="/"><img className="img-fluid" src="assets/img/2-removebg-preview.png" STYLE="max-height: 56px;margin-left: 16px;"/></a><button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
              <div className="collapse navbar-collapse" id="navcol-1">
                  <ul className="navbar-nav mx-auto">
                      <li className="nav-item" hidden=""></li>
                  </ul>
                  <Link to="/" class="btn shadow" role="button"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-arrow-left">
                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"></path>
                    </svg>Home&nbsp;
                  </Link>
              </div>
          </div>
      </nav>
      <header className="bg-dark d-flex align-items-center no-bg" STYLE="min-height: 100px;">
      </header>

      <section STYLE="background: url(&quot;assets/img/background-stars-mobile_338a9d3c.jpeg&quot;) repeat;">
          <div className="container bg-dark py-5" STYLE="background: rgba(0,0,0,0) !important;">
              <div className="row" data-aos="fade">
                  <div className="col-md-8 col-xl-6 text-center mx-auto">
                      <p className="fw-bold text-success mb-2">GALLERY //</p>
                      <h3 className="fw-bold">All Submissions</h3>
                  </div>
              </div>
              <div className="py-5 p-lg-5">
                  <div className="text-center" id="loading-div"><img src="assets/img/r2.gif" STYLE="height: 100px;"


                    hidden={status == ""}/>
                      <p id="loading-text" STYLE="margin: 16px;">{status}</p>
                  </div>


                  <div data-aos="fade" id="nfts-div" hidden={status != ""}>
                      <div className="row row-cols-3 row-cols-md-2 mx-auto" STYLE="max-width: 900px;">


                        {NFTs.map((nft, index) => (
                          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mb-5">
                              <div className="card shadow-sm glow" STYLE="background: #000;">
                                  <div className="card-body px-4 py-5 px-md-5 nft-container"><Image className="img-fluid" width="100%" height="auto" src={nft.image}/>
                                      <div STYLE="padding: 5px 10px;">
                                          <p STYLE="margin: 4px 8px;">{nft.name}</p>
                                          <p STYLE="color: var(--bs-blue);margin: 4px 8px;">{nft.description}</p>
                                          <a className="btn shadow" role="button" href="/worldID">VOTE<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-arrow-right">
                          <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path>
                      </svg>&nbsp;</a>
                                      </div>
                                  </div>
                              </div>
                          </div>
                        ))}

                      </div>

                  </div>
              </div>
          </div>
      </section>

      <section className="py-5">
          <div className="container">
              <div className="bg-dark border rounded border-dark d-flex flex-column justify-content-between align-items-center flex-lg-row p-4 p-lg-5" data-aos="fade">
                  <div className="text-center text-lg-start py-3 py-lg-1">
                      <h2 className="fw-bold mb-2">Subscribe to our newsletter</h2>
                      <p className="mb-0">And receive announcements and updates</p>
                  </div>
                  <form className="d-flex justify-content-center flex-wrap flex-lg-nowrap" method="post">
                      <div className="my-2"><input className="border rounded-pill shadow-sm form-control" type="email" name="email" placeholder="Your Email"/></div>
                      <div className="my-2"><button className="btn btn-primary shadow ms-2" type="submit">Subscribe </button></div>
                  </form>
              </div>
          </div>
      </section>
      <footer className="bg-dark" STYLE="background: #000 !important;">
          <div className="container py-4 py-lg-5">
              <hr/>
              <div className="text-muted d-flex justify-content-between align-items-center pt-3">
                  <p className="mb-0">A Group 6 Project -<br/>Encode Solidity Bootcamp June '22</p>
                  <ul className="list-inline mb-0">
                      <li className="list-inline-item"><a href="https://github.com/Group-6-June-EncodeSolidityBootcamp/Cosplay_Club"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-github fs-1" STYLE="margin: 8px;">
                                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                              </svg></a></li>
                  </ul>
              </div>
          </div>
      </footer>

  </div>
  );
}

export default App;
