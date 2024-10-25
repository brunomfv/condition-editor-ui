export const getProperty = (id: string) => {
	return window.datastore.getProperties().find(property => property.id === +id);
};
