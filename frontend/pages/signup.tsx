import { Form, Input, Button, Icon } from "antd";
import { Formik } from "formik";
import { formItemLayout, buttonItemLayout } from "../components";
import Link from "next/link";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const FormItem = Form.Item;

const SIGNUP_MUTATION = gql`
	mutation SIGNUP_MUTATION(
		$email: String!
		$name: String!
		$password: String!
	) {
		signup(email: $email, name: $name, password: $password) {
			id
			email
			name
		}
	}
`;

export default () => (
	<div>
		<h2>Sign up</h2>
		<Formik
			initialValues={{
				name: "",
				email: "",
				password: ""
			}}
			render={({ values, handleChange, handleSubmit }) => (
				<Mutation mutation={SIGNUP_MUTATION} variables={values}>
					{(signup, { loading, error }) => (
						<Form
							method="post"
							onSubmit={async e => {
								e.preventDefault();
								await signup();
							}}
						>
							<fieldset disabled={loading} aria-busy={loading}>
								<FormItem {...formItemLayout} label="Username">
									<Input
										name="name"
										prefix={
											<Icon
												type="user"
												style={{
													color: "rgba(0,0,0,.25)"
												}}
											/>
										}
										value={values.name}
										type="text"
										onChange={handleChange}
									/>
								</FormItem>
								<FormItem {...formItemLayout} label="Password">
									<Input
										prefix={
											<Icon
												type="lock"
												style={{
													color: "rgba(0,0,0,.25)"
												}}
											/>
										}
										name="password"
										value={values.password}
										type="text"
										onChange={handleChange}
									/>
								</FormItem>
								<FormItem {...formItemLayout} label="E-mail">
									<Input
										prefix={
											<Icon
												type="mail"
												style={{
													color: "rgba(0,0,0,.25)"
												}}
											/>
										}
										name="email"
										value={values.email}
										type="text"
										onChange={handleChange}
									/>
								</FormItem>
								<FormItem {...buttonItemLayout}>
									<Button type="primary" htmlType="submit">
										Sign up
									</Button>
									<Link href="/login">
										<a style={{ marginLeft: "15px" }}>
											Login
										</a>
									</Link>
								</FormItem>
							</fieldset>
						</Form>
					)}
				</Mutation>
			)}
		/>
	</div>
);
