import { AddIcon, CheckIcon, RepeatIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, HStack, Input, Spacer, Text, VStack } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { LOCAL_STORAGE } from "../constant";
import { ListView } from "./ListView";

export const Home = () => {
	const getLocalStorageData = useCallback(() => {
		if (localStorage.getItem(LOCAL_STORAGE) !== null) {
			return JSON.parse(localStorage.getItem(LOCAL_STORAGE));
		} else {
			return [];
		}
	}, []);

	const setLocalStorageData = useCallback(
		(data) => {
			const oldData = getLocalStorageData();
			const updatedData = oldData.concat(data);
			localStorage.setItem(LOCAL_STORAGE, JSON.stringify(updatedData));
		},
		[getLocalStorageData]
	);

	const getIndex = useCallback(() => {
		const data = getLocalStorageData();
		return data?.length + 1;
	}, [getLocalStorageData]);

	const [data, setData] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [lastUpdatedId, setLastUpdatedId] = useState(undefined);

	const onChangeTitleInput = (e) => {
		setTitle(e.target.value);
	};

	const onChangeDescriptionInput = (e) => {
		setDescription(e.target.value);
	};

	const onChangeDueDateInput = (e) => {
		setDueDate(e.target.value);
	};

	const onClickAdd = useCallback(() => {
		if (title !== "" && description !== "" && dueDate !== "") {
			setLocalStorageData({ index: getIndex(), title: title, description: description, dueDate: dueDate });
			setTitle("");
			setDescription("");
			setDueDate("");
			setData(getLocalStorageData());
		}
	}, [description, dueDate, getIndex, getLocalStorageData, setLocalStorageData, title]);

	const onUpdate = (data) => {
		setLastUpdatedId(data?.index);
		setTitle(data?.title);
		setDescription(data?.description);
		setDueDate(data?.dueDate);
	};

	const onClickUpdate = useCallback(() => {
		const values = getLocalStorageData();
		const updatedValues = values.map((d) => {
			if (d.index === lastUpdatedId) {
				return { index: lastUpdatedId, title: title, description: description, dueDate: dueDate };
			} else {
				return d;
			}
		});
		localStorage.setItem(LOCAL_STORAGE, JSON.stringify(updatedValues));
		setData(getLocalStorageData());
		setLastUpdatedId(undefined);
		setTitle("");
		setDescription("");
		setDueDate("");
	}, [description, dueDate, getLocalStorageData, lastUpdatedId, title]);

	const onDelete = (id) => {
		const values = getLocalStorageData();
		const updatedValues = values.filter((d) => d.index !== id);
		localStorage.setItem(LOCAL_STORAGE, JSON.stringify(updatedValues));
		setData(getLocalStorageData());
	};

	return (
		<Center w="100wh" h="100vh" backgroundColor="white">
			<Flex direction="column" w="70%" h="70%" borderRadius="2xl" backgroundColor="red.400" px={20}>
				<HStack w="full" h="fit-content" spacing={0} py={2}>
					<Text w="full" h="fit-content" textAlign="center" fontSize="lg" color="white">
						Trello
					</Text>
				</HStack>
				<HStack w="full" h="fit-content">
					<Input variant="none" placeholder="Title" onChange={onChangeTitleInput} value={title} />
					<Input variant="none" placeholder="Description" onChange={onChangeDescriptionInput} value={description} />
					<Input variant="none" type="date" placeholder="Due Date" onChange={onChangeDueDateInput} value={dueDate} />
					<Spacer />
					{lastUpdatedId === undefined ? (
						<Box w="fit-content" h="fit-content" backgroundColor="white" borderRadius="md" cursor="pointer" px={2} py={2} onClick={onClickAdd}>
							<AddIcon cursor="pointer" color="red.400" />
						</Box>
					) : (
						<Box w="fit-content" h="fit-content" backgroundColor="white" borderRadius="md" cursor="pointer" px={2} py={2} onClick={onClickUpdate}>
							<CheckIcon cursor="pointer" color="red.400" />
						</Box>
					)}

					<Box w="fit-content" h="fit-content" backgroundColor="white" borderRadius="md" cursor="pointer" px={2} py={2}>
						<RepeatIcon cursor="pointer" color="red.400" />
					</Box>
				</HStack>
				<VStack w="full" h={0} flex="1 1 auto" backgroundColor="white" borderRadius="lg" mt={4} mb={8}>
					<ListView data={data} onUpdate={onUpdate} onDelete={onDelete} />
				</VStack>
			</Flex>
		</Center>
	);
};
