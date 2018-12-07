import React from "react";
import { Button } from "antd";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const DELETE_KEYBOARD_MUTATION = gql`
	mutation DELETE_KEYBOARD_MUTATION($id: ID!) {
		deleteKeyboard(id: $id) {
			id
		}
	}
`;

const DeleteKeyboard = ({ id }) => {
	return (
		<Mutation mutation={DELETE_KEYBOARD_MUTATION} variables={{ id }}>
			{(deleteKeyboard, { error }) => (
				<Button
					type="danger"
					onClick={() => {
						if (
							confirm(
								"Are you sure you want to delete this keyboard?"
							)
						) {
							console.log(id);
							deleteKeyboard();
						}
					}}
				>
					Delete
				</Button>
			)}
		</Mutation>
	);
};

export default DeleteKeyboard;
