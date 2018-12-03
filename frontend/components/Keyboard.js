import { Card, Tag } from "antd";
import Link from "next/link";

const { Meta } = Card;

const Cover = ({ name, url, id }) => (
	<Link href={`/keyboard?id=${id}`}>
		<a>
			<img
				style={{
					width: "250px",
					padding: "20px",
					margin: "auto",
					display: "block"
				}}
				src="adfasdf"
				alt={name}
				onError={e => {
					console.log("hey");
					e.target.src =
						"https://target.scene7.com/is/image/Target/GUEST_f91292e8-2cda-4031-85b1-dec4db1621a1?wid=488&hei=488&fmt=webp";
				}}
			/>
		</a>
	</Link>
);

export default ({
	keyboard: {
		image,
		name,
		switches,
		size,
		layout,
		price,
		description,
		keycaps,
		id
	}
}) => {
	return (
		<Card
			hoverable
			style={{ width: 600 }}
			cover={<Cover name={name} url={image} id={id} />}
		>
			<h3 style={{ fontSize: "32px" }}>{name}</h3>
			<div>${price.toFixed(2)}</div>
			<div style={{ margin: "15px 0" }}>
				<Tag color="magenta">{layout}</Tag>
				<Tag color="geekblue">{size}</Tag>
				<Tag color="cyan">used</Tag>
			</div>
			<p>{description}</p>
			<p>Switches: {switches}</p>
			<p>Size: {size}</p>
			<p>Layout: {layout}</p>
			<p>Keycaps: {keycaps}</p>
		</Card>
	);
};
