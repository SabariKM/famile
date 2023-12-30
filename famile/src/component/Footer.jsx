import React from "react";
import vector_11 from "../assets/img/vector-11.svg";
import { Link } from "react-router-dom";

export const Footer = () => {
	return (
		<>
			<div className="">
				<div className="row position-relative d-flex justify-content-around ft-top-rectangle pt-3 pb-3 mx-0">
					<div className="container container-width ">
						<div className="row px-2 px-lg-0">
							<div className="col-8 px-0">
								<div className="ft-overlap">
									<div className="ft-socialm-box">
										<img
											className="ft-heart-vector"
											alt="Vector"
											src={vector_11}
										/>
										<p className="connect-smedia m-0">Social Media</p>
										<p className="connect-smedia-slbl m-0">Connect with us</p>
									</div>
								</div>
							</div>
							<div className="col-4 d-flex justify-content-end p-0">
								<div className="p-0">
									<a href="https://www.instagram.com/_famile_/">
										<img
											className="icon-instagram float-right"
											alt="Icon instagram"
											src={require("../assets/img/icon-instagram.png")}
										/>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row position-relative d-flex justify-content-around ft-btm-rectangle pt-3 pb-3 mx-0">
					<div className="container container-width ">
						<div className="row px-2 px-lg-0">
							<div className="col-8 px-0">
								<div className="col-12 px-0">
									<Link exact to="/termsofuse" className="text-white">
										Terms of Use
									</Link>
								</div>
								<div className="col-12 ">
									<Link exact to="/termofservice" className="text-white">
										Your Privacy &amp; Our Responsibility
									</Link>
								</div>
							</div>
							<div className="col-4 d-flex justify-content-end p-0">
								<div className="col-12 col-md-10 col-lg-7">
									<div className="col-xs-12 col d-flex justify-content-start">
										<Link exact className="text-white mb-2 ms-md-3">
											Contact Us (hello@famile.org)
										</Link>
									</div>
									<div className="col-xs-12 col d-flex justify-content-end">
										<div className=" col-md-12">
											<p exact className="text-white m-0 ms-md-3">
												1D1S Entercon Private Limited
											</p>
											<p exact className="text-white m-0 ms-md-3">
												#3, 4th Street, Balakrishnapuram, Adambakkam, Chennai -
												600088
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
