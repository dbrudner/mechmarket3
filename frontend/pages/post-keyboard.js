// To do:
// Loading state on submit
// Error handling
// Validation schema

import { useState } from "react";
import { Formik } from "formik";
import { Form, Input, Icon, Button, Upload, Modal, Radio, Select } from "antd";
import axios from "axios";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

const RadioGroup = Radio.Group;
const { Option } = Select;

const sizeOptions = [
	{
		name: "40%",
		value: "FORTY_PERCENT"
	},
	{
		name: "60%",
		value: "SIXTY_PERCENT"
	},
	{
		name: "75%",
		value: "SEVENTY_FIVE_PERCENT"
	},
	{
		name: "TKL",
		value: "TKL"
	},
	{
		name: "Full size",
		value: "FULL_SIZE"
	}
];

export const CREATE_KEYBOARD_MUTATION = gql`
	mutation CREATE_KEYBOARD_MUTATION(
		$name: String!
		$switches: String!
		$size: Size!
		$images: [String!]!
		$layout: Layout
		$price: Int!
		$description: String!
		$keycaps: String
		$condition: Condition!
	) {
		createKeyboard(
			name: $name
			switches: $switches
			size: $size
			images: $images
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
		setimages([...images, secure_url]);

		const { uid, name } = img;

		const newImage = { uid, name, status: "done", url: secure_url };

		setImgState({ ...imgState, fileList: [...fileList, newImage] });
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
				keycaps: "",
				condition: ""
			}}
			render={({ handleChange, values, setFieldValue }) => (
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
								<Select
									onChange={size =>
										setFieldValue("size", size)
									}
									name="size"
								>
									{sizeOptions.map(({ value, name }) => (
										<Option value={value}>{name}</Option>
									))}
								</Select>
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
								<RadioGroup
									onChange={handleChange}
									name="layout"
								>
									<Radio value="ISO">ISO</Radio>
									<Radio value="ANSI">ANSI</Radio>
								</RadioGroup>
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
