// To do:
// Allow multiple images to submit
// Fix multiple images preview and state handling
// Loading state on submit
// Error handling
// Validation schema

import { useState } from "react";
import { Formik } from "formik";
import { Form, Input, Icon, Button, Upload, Modal } from "antd";
import axios from "axios";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

export const SINGLE_KEYBOARD_QUERY = gql`
	query SINGLE_KEYBOARD_QUERY($id: ID!) {
		keyboard(where: { id: $id }) {
			id
			name
			description
			price
			size
			layout
			keycaps
			switches
		}
	}
`;

export const UPDATE_KEYBOARD_MUTATION = gql`
	mutation UPDATE_KEYBOARD_MUTATION(
		$id: ID!
		$name: String
		$switches: String
		$size: String
		$image: String
		$layout: String
		$price: Int
		$description: String
		$keycaps: String
	) {
		updateKeyboard(
			id: $id
			name: $name
			switches: $switches
			size: $size
			image: $image
			layout: $layout
			price: $price
			description: $description
			keycaps: $keycaps
		) {
			id
		}
	}
`;

const FormItem = Form.Item;

const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };

const buttonItemLayout = { wrapperCol: { span: 14, offset: 4 } };

export const UpdateKeyboard = props => {
	const handleSubmit = async (values, updateKeyboardMutation) => {
		console.log("updating");
		console.log(values);
		const res = await updateKeyboardMutation({
			variables: { ...values, id: props.id }
		});
		console.log("fin");
	};

	return (
		<Query
			query={SINGLE_KEYBOARD_QUERY}
			variables={{
				id: props.id
			}}
		>
			{({ data, loading }) => {
				const {
					name,
					switches,
					size,
					layout,
					price,
					description,
					keycaps
				} = data.keyboard;

				console.log(data.keyboard);

				if (loading) return <p>Loading...</p>;
				if (!data.keyboard)
					return <p>No keyboard found for ID {props.id}</p>;
				return (
					<Formik
						initialValues={{
							name,
							switches,
							size,
							layout,
							price,
							description,
							keycaps
						}}
						render={({ handleChange, values }) => (
							<Mutation
								mutation={UPDATE_KEYBOARD_MUTATION}
								variables={{
									...values,
									price: parseInt(values.price),
									id: props.id
								}}
							>
								{(updateKeyboard, { loading, error }) => (
									<Form
										onSubmit={e => {
											e.preventDefault();
											handleSubmit(
												values,
												updateKeyboard
											);
										}}
									>
										<FormItem
											{...formItemLayout}
											label="Name"
										>
											<Input
												name="name"
												value={values.name}
												type="text"
												onChange={handleChange}
											/>
										</FormItem>
										<FormItem
											{...formItemLayout}
											label="Switches"
										>
											<Input
												name="switches"
												value={values.switches}
												type="text"
												onChange={handleChange}
											/>
										</FormItem>
										<FormItem
											{...formItemLayout}
											label="Size"
										>
											<Input
												name="size"
												value={values.size}
												type="text"
												onChange={handleChange}
											/>
										</FormItem>
										<FormItem
											{...formItemLayout}
											label="Price"
										>
											<Input
												name="price"
												value={values.price}
												type="text"
												onChange={handleChange}
											/>
										</FormItem>
										<FormItem
											{...formItemLayout}
											label="Layout"
										>
											<Input
												name="layout"
												value={values.layout}
												type="text"
												onChange={handleChange}
											/>
										</FormItem>
										<FormItem
											{...formItemLayout}
											label="Keycaps"
										>
											<Input
												name="keycaps"
												value={values.keycaps}
												type="text"
												onChange={handleChange}
											/>
										</FormItem>
										<FormItem {...buttonItemLayout}>
											<Button
												htmlType="submit"
												type="primary"
											>
												Submit
											</Button>
										</FormItem>
									</Form>
								)}
							</Mutation>
						)}
					/>
				);
			}}
		</Query>
	);
};
