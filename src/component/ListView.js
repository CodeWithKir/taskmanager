import { Center, Text, VStack } from "@chakra-ui/react";
import { Ticket } from "./Ticket";

export const ListView = ({ data, onUpdate, onDelete }) => {
	return (
		<VStack w="full" h="full" px={20} py={10} overflow="auto">
			{data?.length > 0 ? (
				data?.map((d, index) => {
					const key = "data-" + index;
					return <Ticket key={key} data={d} onUpdate={onUpdate} onDelete={onDelete} />;
				})
			) : (
				<Center w="full" h="full">
					<Text w="fit-content" h="fit-content" color="red.400">
						No Data Found
					</Text>
				</Center>
			)}
		</VStack>
	);
};
