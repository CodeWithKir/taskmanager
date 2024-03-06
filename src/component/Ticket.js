import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, HStack, Text } from "@chakra-ui/react";

export const Ticket = ({ data, onUpdate, onDelete }) => {
	return (
		<HStack w="full" f="fit-content">
			<Text w="10%" h="fit-content">
				{data?.index}
			</Text>
			<Text w="25%" h="fit-content">
				{data?.title}
			</Text>
			<Text w="25%" h="fit-content">
				{data?.description}
			</Text>
            <Text w="25%" h="fit-content">
                {data?.dueDate}
            </Text>
			<Box w="5%" h="fit-content" onClick={() => onUpdate(data)}>
				<EditIcon cursor="pointer" color="red.400" />
			</Box>
			<Box w="5%" h="fit-content" onClick={() => onDelete(data?.index)}>
				<DeleteIcon cursor="pointer" color="red.400" />
			</Box>
		</HStack>
	);
};
