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
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

export const CREATE_KEYBOARD_MUTATION = gql`
	mutation CREATE_KEYBOARD_MUTATION(
		$name: String!
		$switches: String!
		$size: String!
		$image: String
		$layout: String
		$price: Int!
		$description: String!
		$keycaps: String
	) {
		createKeyboard(
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

const UploadButton = () => (
	<div>
		<Icon type="plus" />
		<div className="ant-upload-text">Upload</div>
	</div>
);

export default () => {
	const initialState = {
		previewVisible: false,
		previewImage: "",
		fileList: [],
		preventFire: false
	};

	const [imgState, setImgState] = useState(initialState);
	const [images, setimages] = useState([]);

	const handleCancel = () =>
		setImgState({ ...imgState, previewVisible: false });

	const handlePreview = file =>
		setImgState({
			...imgState,
			previewImage: file.url || file.thumbUrl,
			previewVisible: true
		});

	const handleImgChange = e => {
		setImgState({ ...imgState, fileList: e.fileList });
	};

	const handleImgSubmit = async img => {
		const data = new FormData();
		data.append("file", img);
		data.append("upload_preset", "ykospw2o");

		const res = await axios.post(
			"https://api.cloudinary.com/v1_1/dy5ptksj0/image/upload",
			data
		);

		const { secure_url } = res.data;
		setimages([...images, secure_url]);
	};

	const handleSubmit = async values => {
		await imgState.fileList.forEach(({ originFileObj }) =>
			handleImgSubmit(originFileObj)
		);
	};

	const { previewVisible, previewImage, fileList } = imgState;

	return (
		<Formik
			initialValues={{
				name: "",
				switches: "",
				size: "",
				layout: "",
				price: "",
				description: "",
				keycaps: ""
			}}
			onSubmit={handleSubmit}
			render={({ handleSubmit, handleChange, values }) => (
				<Mutation
					mutation={CREATE_KEYBOARD_MUTATION}
					variables={{
						...values,
						price: parseInt(values.price),
						image: "blah"
					}}
				>
					{(createKeyboard, { loading, error }) => (
						<Form
							onSubmit={async e => {
								e.preventDefault();
								const res = await createKeyboard();
								Router.push({
									pathname: "/keyboard",
									query: {
										id: res.data.createKeyboard.id
									}
								});
							}}
						>
							<FormItem {...formItemLayout} label="Add an Image">
								<Upload
									action="//jsonplaceholder.typicode.com/posts/"
									listType="picture-card"
									fileList={fileList}
									onPreview={handlePreview}
									onChange={handleImgChange}
								>
									{fileList.length >= 4 ? null : (
										<UploadButton />
									)}
								</Upload>
								<Modal
									visible={previewVisible}
									footer={null}
									onCancel={handleCancel}
								>
									<img
										alt="example"
										style={{ width: "100%" }}
										src={previewImage}
									/>
								</Modal>
							</FormItem>
							<FormItem {...formItemLayout} label="Name">
								<Input
									name="name"
									value={values.name}
									type="text"
									onChange={handleChange}
								/>
							</FormItem>
							<FormItem {...formItemLayout} label="Switches">
								<Input
									name="switches"
									value={values.switches}
									type="text"
									onChange={handleChange}
								/>
							</FormItem>
							<FormItem {...formItemLayout} label="Size">
								<Input
									name="size"
									value={values.size}
									type="text"
									onChange={handleChange}
								/>
							</FormItem>
							<FormItem {...formItemLayout} label="Price">
								<Input
									name="price"
									value={values.price}
									type="text"
									onChange={handleChange}
								/>
							</FormItem>
							<FormItem {...formItemLayout} label="Layout">
								<Input
									name="layout"
									value={values.layout}
									type="text"
									onChange={handleChange}
								/>
							</FormItem>
							<FormItem {...formItemLayout} label="Keycaps">
								<Input
									name="keycaps"
									value={values.keycaps}
									type="text"
									onChange={handleChange}
								/>
							</FormItem>
							<FormItem {...buttonItemLayout}>
								<Button htmlType="submit" type="primary">
									Submit
								</Button>
							</FormItem>
						</Form>
					)}
				</Mutation>
			)}
		/>
	);
};
