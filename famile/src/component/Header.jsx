import React from "react";
import { AccessContext } from "../constant/AccessContext";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Header = (props) => {
	const acc_type = props.acc_type;
	const loginStatus = props.loginStatus;
	const handleLogout = React.useContext(AccessContext).handleLogout;

	let navigate = useNavigate();
	const [open, setOpen] = React.useState("d-none");

	const handleClose = () => {
		setOpen("d-none");
	};

	const handleOpen = () => {
		setOpen("d-block");
	};

	const LoginRegisterbtn = () => {
		if (acc_type === "login" || acc_type === "register") {
			return (
				<div className="col-8">
					<div className="row d-flex justify-content-end">
						<div className="col-12 d-flex justify-content-end">
							<p
								className="text-white pe-2 pt-1 float-right d-none d-md-block"
								style={{ float: "right" }}
							>
								Already a member?
							</p>
							<div className="d-grid gap-2 ">
								<button
									className="btn btn-outline-light btn-lg py-2 login-btn"
									width={{ width: "112px" }}
									onClick={() => {
										navigate("/login", { state: { ret_type: "login" } });
										props.ret_type("login");
									}}
								>
									LOGIN
								</button>
							</div>
							<div className="d-grid gap-2 ">
								<button
									className="btn btn-light btn-lg py-2 login-btn mx-1"
									width={{ width: "112px" }}
									onClick={() => {
										navigate("/login", { state: { ret_type: "register" } });
										props.ret_type("register");
									}}
								>
									Join
								</button>
							</div>
						</div>
					</div>
				</div>
			);
			// } else if (acc_type === "register") {
			// 	return (
			// 		<div className="col-6 col-md-2 d-flex justify-content-end">
			// 			<div className="d-grid gap-2 ">
			// 				<button
			// 					className="btn btn-light btn-lg login-btn"
			// 					width={{ width: "112px" }}
			// 					onClick={() => {
			// 						props.ret_type("register");
			// 						navigate("/login");
			// 					}}
			// 				>
			// 					Join
			// 				</button>
			// 			</div>
			// 		</div>
			// 	);
		} else {
			return <></>;
		}
	};
	return (
		<>
			<nav className="navbar  navbar_bg">
				<div className="container container-width">
					<div className="col d-flex ">
						<NavLink exact className="navbar-brand" to="/">
							<img
								src={require("../assets/logo/logo_light.png")}
								srcSet={require("../assets/logo/logo_light.png")}
								alt="Famile Logo"
								width="90"
								height="70"
							/>
						</NavLink>
						{loginStatus === "LOGGINSUCCESS" && (
							<div className="col-12 d-none d-sm-none d-md-none d-lg-block d-xl-block mt-4 pt-1 ms-5 ps-5">
								<ul className="navbar-nav main-nav me-auto mb-2 mb-lg-0 ms-5 ps-5">
									<li className="main-nav-item">
										<NavLink
											exact
											activeClassName="main-nav-item-active"
											className="nav-NavLink text-white"
											aria-current="page"
											to="/personalinfo"
										>
											Your Profile
										</NavLink>
									</li>
									<li className="main-nav-item">
										<NavLink
											exact
											activeClassName="main-nav-item-active"
											className="nav-NavLink text-white"
											to="/subscription"
										>
											Subscription
										</NavLink>
									</li>
									<li className="main-nav-item">
										<NavLink
											exact
											activeClassName="main-nav-item-active"
											className="nav-NavLink text-white"
											to="/preference"
										>
											Preference
										</NavLink>
									</li>
									<li className="main-nav-item">
										<a className="nav-NavLink text-white" onClick={handleOpen}>
											Logout
										</a>
									</li>
								</ul>
							</div>
						)}
					</div>
					{loginStatus === "LOGGINSUCCESS" ? (
						<>
							<button
								className="navbar-toggler d-block  d-sm-block d-md-block d-lg-none d-xl-none"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#navbarSupportedContent"
								aria-controls="navbarSupportedContent"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								<span className="navbar-toggler-icon"></span>
							</button>
							<div className="d-block d-sm-block d-md-block d-lg-none d-xl-none xl-navbar bg-white">
								<div
									className="collapse navbar-collapse d-lg-none d-xl-none"
									id="navbarSupportedContent"
								>
									<ul className="navbar-nav me-auto mb-2 mb-lg-0">
										<li className="nav-item">
											<NavLink
												exact
												className="nav-NavLink active text-dark"
												aria-current="page"
												to="/personalinfo"
											>
												Your Profile
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink
												exact
												className="nav-NavLink text-dark"
												to="/subscription"
											>
												Subscription
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink
												exact
												className="nav-NavLink text-dark"
												to="/preference"
											>
												Preferance
											</NavLink>
										</li>
										<li className="nav-item">
											<a className="nav-NavLink text-dark" onClick={handleOpen}>
												Logout
											</a>
										</li>
									</ul>
								</div>
							</div>
						</>
					) : (
						<>
							<LoginRegisterbtn />
						</>
					)}
				</div>
			</nav>
			<div>
				<ToastContainer
					position="top-center"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
			</div>

			<div id="myModal" className={`modal ${open}`}>
				<div className="modal-content position-relative">
					<div className="close position-absolute bg-dark text-white circle-div">
						<span onClick={() => handleClose()}>&times;</span>
					</div>
					<p className="text-center">You are about to logout?</p>
					<div className="col">
						<div className="d-flex justify-content-center">
							<div className=" d-grid gap-2 ">
								<button
									className="btn btn-light btn-lg py-2 logout-btn"
									width={{ width: "112px" }}
									onClick={() => handleClose()}
								>
									Stay
								</button>
							</div>
							<div className="d-grid gap-2 ">
								<button
									className="btn btn-light btn-lg py-2 logout-btn mx-1 btn-dark"
									width={{ width: "112px" }}
									onClick={() => handleLogout(true)}
								>
									Confirm
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
