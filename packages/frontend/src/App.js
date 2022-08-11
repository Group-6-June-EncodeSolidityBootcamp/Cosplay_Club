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
    for (let i = totalSubmissions - 1; i > totalSubmissions - 10; i -= 1) {
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
                  </ul><a className="btn shadow" role="button" href="#submission">SUBMIT ENTRY<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-arrow-right">
                          <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path>
                      </svg>&nbsp;</a>
              </div>
          </div>
      </nav>
      <header className="bg-dark d-flex align-items-center no-bg" STYLE="min-height: 100vh;"><video data-object-fit="cover" data-object-position="center center" className="top__video" autoPlay="autoplay" loop="loop" muted="muted" playsInline="playsinline"><source src="assets/bg-video.mp4" type="video/mp4"/></video>
          <div className="container pt-4 pt-xl-5">
              <div className="row pt-5">
                  <div className="col-md-8 col-xl-6 text-center text-md-start mx-auto">
                      <div className="text-center">
                          <p className="fw-normal text-success mb-2" data-aos="fade"><strong>#MAY_THE_FORCE_BE_WITH_YOU</strong><br/>#star_wars_cosplay_contest<br/>#decentralised<br/></p><img className="img-fluid" data-aos="fade" data-aos-delay="200" src="assets/img/Star_Wars_Logo..png" STYLE="min-height: 200px;margin: -10px 0px;"/>
                      </div>
                  </div>
              </div>
          </div>
      </header>
      <section className="py-5">
          <div className="container text-center py-5">
              <h2 className="text-start text-info mb-4" data-aos="fade" STYLE="max-width: 800px;margin: auto;padding: 24px 0px;">A long time ago in a galaxy far, far away....</h2>
              <h3 className="text-start mb-4 brown-text" data-aos="fade" STYLE="max-width: 800px;margin: auto;padding: 24px 0px;">Get inspired by the world of Star Wars and take part in&nbsp;<span STYLE="color: rgb(255, 255, 255);">the first ever cosplay contest on the blockchain!</span>&nbsp;Create a getup based on a character from the franchise and blow our minds and shine on the web3 world stage!</h3>
          </div>
      </section>
      <section STYLE="background: url(&quot;assets/img/background-stars-mobile_338a9d3c.jpeg&quot;) repeat;">
          <div className="container bg-dark py-5" STYLE="background: rgba(0,0,0,0) !important;">
              <div className="row" data-aos="fade">
                  <div className="col-md-8 col-xl-6 text-center mx-auto">
                      <p className="fw-bold text-success mb-2">GALLERY //</p>
                      <h3 className="fw-bold">Latest Submissions</h3>
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
                                      </div>
                                  </div>
                              </div>
                          </div>
                        ))}
                        
                      </div>
                      
                      <Link to="/seeAllSubmissions" className="btn btn-primary d-block m-auto" type="button">See All Submissions&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-arrow-right">
                              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path>
                          </svg></Link>
                  </div>
              </div>
          </div>
      </section>
      <section>
          <div className="container bg-dark py-5" STYLE="background: rgba(0,0,0,0) !important;">
              <div className="row" data-aos="fade">
                  <div className="col-md-8 col-xl-6 text-center mx-auto">
                      <p className="fw-bold text-success mb-2">QUESTIONS //</p>
                      <h3 className="fw-bold">Know more about the Contest</h3>
                  </div>
              </div>
              <div className="py-5 p-lg-5">
                  <div className="row row-cols-1 row-cols-md-2 mx-auto" STYLE="max-width: 900px;">
                      <div className="col mb-5">
                          <div className="card shadow-sm" data-aos="fade">
                              <div className="card-body px-4 py-5 px-md-5">
                                  <div className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon" STYLE="top: 1rem;right: 1rem;position: absolute;"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-question-diamond text-success">
                                          <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"></path>
                                          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"></path>
                                      </svg></div>
                                  <h5 className="fw-bold card-title">How can I Participate?</h5>
                                  <p className="text-muted card-text mb-4">You can connect to the website with a wallet and submit your entry by uploading an image using the form.&nbsp;</p><button className="btn btn-primary shadow" type="button">Learn more</button>
                              </div>
                          </div>
                      </div>
                      <div className="col mb-5">
                          <div className="card shadow-sm" data-aos="fade">
                              <div className="card-body px-4 py-5 px-md-5">
                                  <div className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon" STYLE="top: 1rem;right: 1rem;position: absolute;"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-question-diamond text-success">
                                          <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"></path>
                                          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"></path>
                                      </svg></div>
                                  <h5 className="fw-bold card-title">Why is this special?</h5>
                                  <p className="text-muted card-text mb-4">You own your submission as an NFT, the judging is decentralized and any censoring is done only by a DAO.</p><button className="btn btn-primary shadow" type="button">Learn more</button>
                              </div>
                          </div>
                      </div>
                      <div className="col mb-4">
                          <div className="card shadow-sm" data-aos="fade">
                              <div className="card-body px-4 py-5 px-md-5">
                                  <div className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon" STYLE="top: 1rem;right: 1rem;position: absolute;"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-question-diamond text-success">
                                          <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"></path>
                                          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"></path>
                                      </svg></div>
                                  <h5 className="fw-bold card-title">Who are the Judges?</h5>
                                  <p className="text-muted card-text mb-4">The judges are people with votes based on a special ERC20 governance token and voting is done within the smart contract on the blockchain.</p><button className="btn btn-primary shadow" type="button">Learn more</button>
                              </div>
                          </div>
                      </div>
                      <div className="col mb-4">
                          <div className="card shadow-sm" data-aos="fade">
                              <div className="card-body px-4 py-5 px-md-5">
                                  <div className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon" STYLE="top: 1rem;right: 1rem;position: absolute;"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-question-diamond text-success">
                                          <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"></path>
                                          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"></path>
                                      </svg></div>
                                  <h5 className="fw-bold card-title">Is there costume rules?</h5>
                                  <p className="text-muted card-text mb-4">No rules!<br/>But of course, wear something related to the theme (star wars), and please don't submit any NSFW content.</p><button className="btn btn-primary shadow" type="button">Learn more</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <section>
          <div className="container py-5">
              <div className="mx-auto" STYLE="max-width: 900px;">
                  <div className="row mb-5" data-aos="fade">
                      <div className="col-md-8 col-xl-6 text-center mx-auto">
                          <p className="fw-bold text-success mb-2">PRIZES //</p>
                          <h2 className="fw-bold"><strong>What You can Win!</strong></h2>
                          <p className="text-muted w-lg-50">These prizes may be humble, but you can still be proud to win.</p>
                      </div>
                  </div>
                  <div className="row row-cols-1 row-cols-md-2 d-flex justify-content-center">
                      <div className="col mb-4">
                          <div className="card bg-primary-light" data-aos="zoom-in">
                              <div className="card-body text-center px-4 py-5 px-md-5">
                                  <p className="fs-1 fw-bold text-primary card-text mb-2">1st Place&nbsp;<strong><span STYLE="color: rgb(255, 255, 255);">🎉</span></strong></p>
                                  <h3 className="fw-bold card-title mb-3" STYLE="text-align: left;">- 10 Eth<br/>- Special NFT Prize<br/>- 100 JUTO Tokens<br/></h3>
                              </div>
                          </div>
                      </div>
                      <div className="col mb-4">
                          <div className="card bg-secondary-light" data-aos="zoom-in">
                              <div className="card-body text-center px-4 py-5 px-md-5">
                                  <p className="fs-1 fw-bold text-secondary card-text mb-2">2nd Place&nbsp;<strong><span STYLE="color: rgb(255, 255, 255);">✨</span></strong></p>
                                  <h3 className="fw-bold text-start card-title mb-3">- 1 Eth<br/>- Special NFT Prize<br/>- 100 JUTO Tokens<br/></h3>
                              </div>
                          </div>
                      </div>
                      <div className="col mb-4">
                          <div className="card bg-info-light" data-aos="zoom-in">
                              <div className="card-body text-center px-4 py-5 px-md-5">
                                  <p className="fs-1 fw-bold text-info card-text mb-2">3rd Place&nbsp;<strong><span STYLE="color: rgb(255, 255, 255);">😎</span></strong></p>
                                  <h3 className="fw-bold text-start card-title mb-3">- Special NFT Prize<br/>- 100 JUTO Tokens<br/></h3>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <section id="submission" className="py-5">
          <div className="container">
              <div className="row mb-5" data-aos="fade">
                  <div className="col-md-8 col-xl-6 text-center mx-auto">
                      <p className="fw-bold text-success mb-2">SUBMIT ENTRY //</p>
                      <h2 className="fw-bold">Upload Your Submission</h2>
                  </div>
              </div>
              <div className="row d-flex justify-content-center" data-aos="fade">
                  <div className="col-md-6 col-xl-4">
                      <div>
                          <form className="p-3 p-xl-4" method="post">
                              <div className="mb-3"><input className="form-control" type="text" id="name-1" name="name" placeholder="Name" required=""/></div>
                              <div className="mb-3"><input className="form-control" type="text" id="name-2" name="character" placeholder="Character" required=""/></div>
                              <div className="mb-3"><input className="form-control file-input" type="file" required=""/></div>
                              <div><button className="btn btn-primary shadow d-block w-100" type="submit">Submit</button></div>
                          </form>
                      </div>
                  </div>
                  <div className="col-md-4 col-xl-4 d-flex justify-content-center justify-content-xl-start">
                      <div className="d-flex flex-wrap flex-md-column justify-content-md-start align-items-md-start h-100">
                          <div className="d-flex align-items-center p-3">
                              <div className="bs-icon-md bs-icon-circle bs-icon-primary shadow d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon bs-icon-md"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-image">
                                      <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
                                      <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"></path>
                                  </svg></div>
                              <div className="px-2">
                                  <h6 className="fw-bold mb-0">Format for Submission</h6>
                                  <p className="text-muted mb-0">Image (png, jpg...)</p>
                              </div>
                          </div>
                          <div className="d-flex align-items-center p-3">
                              <div className="bs-icon-md bs-icon-circle bs-icon-primary shadow d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon bs-icon-md"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-person">
                                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                                  </svg></div>
                              <div className="px-2">
                                  <h6 className="fw-bold mb-0">Maximum Submission</h6>
                                  <p className="text-muted mb-0">Only 1 per user<br/>PS: You cannot edit or delete after Submitting.</p>
                              </div>
                          </div>
                          <div className="d-flex align-items-center p-3">
                              <div className="bs-icon-md bs-icon-circle bs-icon-primary shadow d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon bs-icon-md"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-pin">
                                      <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354zm1.58 1.408-.002-.001.002.001zm-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a4.922 4.922 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a4.915 4.915 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.775 1.775 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14c.06.1.133.191.214.271a1.78 1.78 0 0 0 .37.282z"></path>
                                  </svg></div>
                              <div className="px-2">
                                  <h6 className="fw-bold mb-0">Submission Deadline</h6>
                                  <p className="text-muted mb-0">August 30th 2022</p>
                              </div>
                          </div>
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
