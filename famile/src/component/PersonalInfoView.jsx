import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const PersonalInfoView = (props) => {
	const [formData, setFormData] = useState({
		fname: "",
		email: "",
		gender: "",
		dob: "",
		language: "",
		religion: "",
		edu_qual: "",
		profession: "",
		annual_income: "",
		food: "",
		height: "",
		weight: "",
		city: "",
		state: "",
		country: "",
		photo: require("../assets/img/signup/profilesample.png"),
	});

	const handleEditView = (name) => {
		props.pageChange(name);
	};

	useEffect(() => {
		setFormData(props.formData);
	}, []);
	return (
		<>
			<div className="preferance row mt-2">
				<div className="col-12 ">
					<div className="d-flex justify-content-center">
						<div className="col-8">
							<div className="col-12 d-flex justify-content-center">
								<div className="sampleImgBox position-relative">
									<div className="d-flex justify-content-center ">
										<img
											className={`img-fluid`}
											src={formData.photo}
											alt="profileimg"
										/>
									</div>
								</div>
							</div>
							<div className="col d-flex justify-content-center mt-2">
								<img
									className="img-fluid"
									src={require("../assets/img/signup/signuptop.png")}
									alt="heart"
									width="129px"
									height="71px"
								/>
							</div>
							<div className="preftbl d-flex justify-content-center">
								<table className="">
									<tbody>
										<tr>
											<td>Full Name</td>
											<td>:</td>
											<td className="text-break">{formData.fname}</td>
										</tr>
										<tr>
											<td>Email</td>
											<td>:</td>
											<td className="text-break">{formData.email}</td>
										</tr>
										<tr>
											<td>Gender</td>
											<td>:</td>
											<td>{formData.gender}</td>
										</tr>
										<tr>
											<td>Date Of Birth</td>
											<td>:</td>
											<td>{formData.dob}</td>
										</tr>
										<tr>
											<td>Language</td>
											<td>:</td>
											<td>{formData.language}</td>
										</tr>
										<tr>
											<td>Religion</td>
											<td>:</td>
											<td>{formData.religion}</td>
										</tr>
										<tr>
											<td>Educational</td>
											<td>:</td>
											<td>{formData.edu_qual}</td>
										</tr>
										<tr>
											<td>Profession</td>
											<td>:</td>
											<td>{formData.profession}</td>
										</tr>
										<tr>
											<td>Annual Income</td>
											<td>:</td>
											<td>{formData.annual_income}</td>
										</tr>
										<tr>
											<td>Food</td>
											<td>:</td>
											<td>{formData.food}</td>
										</tr>
										<tr>
											<td>Weight</td>
											<td>:</td>
											<td>{formData.weight}</td>
										</tr>
										<tr>
											<td>Height</td>
											<td>:</td>
											<td>{formData.height}</td>
										</tr>
										<tr>
											<td>City</td>
											<td>:</td>
											<td>{formData.city}</td>
										</tr>
										<tr>
											<td>State</td>
											<td>:</td>
											<td>{formData.state}</td>
										</tr>
										<tr>
											<td>Country</td>
											<td>:</td>
											<td>{formData.country}</td>
										</tr>
									</tbody>
								</table>
							</div>

							<div className="d-flex justify-content-center mb-5 mt-4">
								<div className="d-grid gap-5 bg-light">
									<button
										className="btn shadow-sm btn-dark text-white font14 mt-2 "
										onClick={() => handleEditView("EDIT")}
									>
										Edit Details
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
