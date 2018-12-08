import gql from "graphql-tag";
import { Query } from "react-apollo";
import Keyboard from "../components/Keyboard";
import { Card, Tag, Button, Carousel } from "antd";
import DeleteKeyboard from "./DeleteKeyboard";

const { Meta } = Card;

const SINGLE_KEYBOARD_QUERY = gql`
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
			images
			condition
		}
	}
`;

const Cover = ({ images, name }) => (
	<div style={{ padding: "50px" }}>
		<Carousel>
			{images.map(image => (
				<img
					key={`keyboard-carousel-img-url-${image}`}
					src={image}
					alt={name}
					onError={e => {
						console.log(e);
						e.target.src =
							"https://target.scene7.com/is/image/Target/GUEST_f91292e8-2cda-4031-85b1-dec4db1621a1?wid=488&hei=488&fmt=webp";
					}}
				/>
			))}
		</Carousel>
	</div>
);

const SingleKeyboardCard = ({
	keyboard: {
		name,
		switches,
		size,
		layout,
		price,
		description,
		keycaps,
		id,
		condition,
		images
	}
}) => {
	console.log(layout);
	return (
		<>
			<h3 style={{ fontSize: "32px" }}>{name}</h3>
			<Card
				style={{ maxWidth: 600, marginTop: "15px" }}
				cover={<Cover name={name} images={images} />}
			>
				<div>${price.toFixed(2)}</div>
				<div style={{ margin: "15px 0" }}>
					<Tag color="magenta">{layout}</Tag>
					<Tag color="geekblue">{size}</Tag>
					<Tag color="cyan">{condition || "Used"}</Tag>
				</div>
				<p>{description}</p>
				<p>Switches: {switches}</p>
				<p>Size: {size}</p>
				<p>Layout: {layout}</p>
				<p>Keycaps: {keycaps}</p>
				<DeleteKeyboard id={id} />
			</Card>
		</>
	);
};

export default ({ id }) => (
	<Query query={SINGLE_KEYBOARD_QUERY} variables={{ id }}>
		{({ error, loading, data }) => {
			if (error) return <p>{error}</p>;

			if (!data.keyboard) {
				return <div>No keyboard babe</div>;
			}

			return (
				<div>
					<SingleKeyboardCard keyboard={data.keyboard} />
				</div>
			);
		}}
	</Query>
);
