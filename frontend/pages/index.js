import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Keyboard from "../components/Keyboard";
import Pagination from "../components/Pagination";
import { perPage } from "../config";

const ALL_KEYBOARDS_QUERY = gql`
	query ALL_KEYBOARDS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
		keyboards(first: $first, skip: $skip, orderBy: createdAt_DESC) {
			images
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

const Items = props => {
	const page = parseInt(props.query.page) || 1;
	return (
		<>
			<Pagination page={page} />
			<Query
				query={ALL_KEYBOARDS_QUERY}
				variables={{
					skip: (page - 1) * perPage,
					first: perPage
				}}
			>
				{({ data, error, loading }) => {
					if (loading) return <p>Loading...</p>;
					if (error) return <p>Error: {error.message}</p>;
					return (
						<div>
							<h2>Home</h2>
							{data.keyboards.map(keyboard => (
								<Keyboard
									keyboard={keyboard}
									key={keyboard.id}
								/>
							))}
						</div>
					);
				}}
			</Query>
			<Pagination />
		</>
	);
};

export default Items;
