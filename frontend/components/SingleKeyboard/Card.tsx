import { Card, Tag } from "antd";
import DeleteKeyboard from "../DeleteKeyboard";
import { KeyboardValues } from "../";
import { Cover } from "./Cover";

type Props = {
	keyboard: KeyboardValues;
};

export const SingleKeyboardCard: React.SFC<Props> = ({
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
}) => (
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
