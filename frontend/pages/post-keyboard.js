// To do:
// Loading state on submit
// Error handling
// Validation schema

import { useState } from "react";
import { Formik } from "formik";
import { Form, Input, Icon, Button, Upload, Modal, Radio } from "antd";
import axios from "axios";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

const RadioGroup = Radio.Group;

export const CREATE_KEYBOARD_MUTATION = gql`
	mutation CREATE_KEYBOARD_MUTATION(
		$name: String!
		$switches: String!
		$size: String!
		$images: [String!]!
		$layout: String
		$price: Int!
		$description: String!
		$keycaps: String
		$condition: Condition!
	) {
		createKeyboard(
			name: $name
			switches: $switches
			size: $size
			images: { set: $images }
			layout: $layout
			price: $price
			description: $description
			keycaps: $keycaps
			condition: $condition
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
		fileList: []
	};

	const [imgState, setImgState] = useState(initialState);
	const [images, setimages] = useState([]);
	const [preventFire, setPreventFire] = useState(false);

	const handleCancel = () =>
		setImgState({ ...imgState, previewVisible: false });

	const handlePreview = file =>
		setImgState({
			...imgState,
			previewImage: file.url || file.thumbUrl,
			previewVisible: true
		});

	const handleImgChange = async e => {
		const img = e.fileList[e.fileList.length - 1].originFileObj;
		const data = new FormData();
		data.append("file", img);
		data.append("upload_preset", "ykospw2o");

		const res = await axios.post(
			"https://api.cloudinary.com/v1_1/dy5ptksj0/image/upload",
			data
		);

		const { secure_url } = await res.data;
		console.log(secure_url);
		setimages([...images, secure_url]);

		const { uid, name } = img;

		const newImage = { uid, name, status: "done", url: secure_url };

		setImgState({ ...imgState, fileList: [...fileList, newImage] });
	};

	const handleSubmit = async values => {
		console.log({ ...values, images });
	};

	const { previewVisible, previewImage, fileList } = imgState;

	console.log(imgState.fileList);

	return (
		<Formik
			initialValues={{
				name: "",
				switches: "",
				size: "",
				layout: "",
				price: "",
				description: "",
				keycaps: "",
				condition: ""
			}}
			onSubmit={handleSubmit}
			render={({ handleSubmit, handleChange, values }) => (
				<Mutation
					mutation={CREATE_KEYBOARD_MUTATION}
					variables={{
						...values,
						price: parseInt(values.price),
						images
					}}
				>
					{(createKeyboard, { loading, error }) => (
						<Form
							onSubmit={async e => {
								e.preventDefault();
								console.log(values);
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
									action={null}
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
							<FormItem {...formItemLayout} label="Condition">
								<RadioGroup
									name="condition"
									onChange={handleChange}
								>
									<Radio value="NEW">New</Radio>
									<Radio value="USED">Used</Radio>
								</RadioGroup>
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
