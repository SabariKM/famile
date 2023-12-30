import React, { useEffect, useState } from "react";

export const PreferanceView = (props) => {
	const [formData, setFormData] = useState({
		gender: "",
		fromAge: "",
		toAge: "",
		marital_status: "",
		food: "",
		language: "",
		religion: "",
		state: "",
		country: "",
	});

	useEffect(() => {
		setFormData(props.formData);
	}, []);
	return (
		<div className="preftbl-pref d-flex justify-content-center mt-5">
			<table>
				<tbody>
					<tr>
						<td>Gender</td>
						<td>:</td>
						<td>{formData.gender}</td>
					</tr>
					<tr>
						<td>Age</td>
						<td>:</td>
						<td>{formData.fromAge + " - " + formData.toAge}</td>
					</tr>
					<tr>
						<td>Marital Status</td>
						<td>:</td>
						<td>{formData.marital_status}</td>
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
						<td>Food</td>
						<td>:</td>
						<td>{formData.food}</td>
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
	);
};
