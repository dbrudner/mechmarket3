import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Keyboard from "../components/Keyboard";

const ALL_KEYBOARDS_QUERY = gql`
	query ALL_KEYBOARDS_QUERY {
		keyboards {
			image
			name
			switches
			size
			layout
			price
			description
			keycaps
			id
		}
	}
`;

const Items = () => (
	<Query query={ALL_KEYBOARDS_QUERY}>
		{({ data, error, loading }) => {
			if (loading) return <p>Loading...</p>;
			if (error) return <p>Error: {error.message}</p>;
			return (
				<div>
					<h2>Home</h2>
					{data.keyboards.map(keyboard => (
						<Keyboard keyboard={keyboard} key={keyboard.id} />
					))}
				</div>
			);
		}}
	</Query>
);

export default Items;
