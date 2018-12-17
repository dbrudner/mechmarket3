import { Form, Input, Button, Icon } from "antd";
import { Formik } from "formik";
import { formItemLayout, buttonItemLayout } from "../components";
import Link from "next/link";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { CURRENT_USER_QUERY } from "../components/User";

const FormItem = Form.Item;

const SIGNIN_MUTATION = gql`
	mutation SIGNIN_MUTATION($email: String!, $password: String!) {
		signin(email: $email, password: $password) {
			id
			email
			name
		}
	}
`;

export default () => (
	<div>
		<h2>Sign in</h2>
		<Formik
			initialValues={{
				email: "",
				password: ""
			}}
			render={({ values, handleChange, handleSubmit }) => (
				<Mutation
					refetchQueries={[{ query: CURRENT_USER_QUERY }]}
					mutation={SIGNIN_MUTATION}
					variables={values}
				>
					{(signin, { loading, error }) => (
						<Form
							method="post"
							onSubmit={async e => {
								e.preventDefault();
								await signin();
							}}
						>
							<fieldset disabled={loading} aria-busy={loading}>
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
								<FormItem {...buttonItemLayout}>
									<Button type="primary" htmlType="submit">
										Sign in
									</Button>
									<Link href="/signup">
										<a style={{ marginLeft: "15px" }}>
											Sign up
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
