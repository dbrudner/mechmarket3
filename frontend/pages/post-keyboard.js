import { useState } from "react";
import { Formik } from "formik";
import { Form, Input, Icon, Button, Upload, Modal } from "antd";
import axios from "axios";
import _ from "lodash";

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

	const handleCancel = () =>
		setImgState({ ...imgState, previewVisible: false });

	const handlePreview = file =>
		setImgState({
			...imgState,
			previewImage: file.url || file.thumbUrl,
			previewVisible: true
		});

	const handleImgSubmit = async e => {
		setImgState({
			...imgState,
			fileList: [...fileList, e.file]
		});
		const data = new FormData();
		data.append("file", e.file);
		data.append("upload_preset", "ykospw2o");

		const res = await axios.post(
			"https://api.cloudinary.com/v1_1/dy5ptksj0/image/upload",
			data
		);
	};

	const { previewVisible, previewImage, fileList } = imgState;

	return (
		<Formik
			initialValues={{
				name: "",
				switches: "",
				size: "",
				image: "",
				layout: "",
				price: "",
				description: "",
				keycaps: ""
			}}
			handleSubmit={values => console.log(values)}
			render={({ handleSubmit, handleChange, values }) => (
				<Form onSubmit={handleSubmit}>
					<FormItem {...formItemLayout} label="Add an Image">
						<Upload
							action="https://api.cloudinary.com/v1_1/dy5ptksj0/image/upload"
							listType="picture-card"
							fileList={fileList}
							onPreview={handlePreview}
							customRequest={handleImgSubmit}
						>
							{fileList.length >= 4 ? null : <UploadButton />}
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
		/>
	);
};
