import gql from "graphql-tag";
import { Query } from "react-apollo";
import Keyboard from "../components/Keyboard";

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
		}
	}
`;

export default ({ id }) => (
	<Query query={SINGLE_KEYBOARD_QUERY} variables={{ id }}>
		{({ error, loading, data }) => {
			if (error) return <p>{error}</p>;

			if (!data.keyboard) {
				return <div>No keyboard babe</div>;
			}

			return (
				<div>
					<Keyboard keyboard={data.keyboard} />
				</div>
			);
		}}
	</Query>
);
