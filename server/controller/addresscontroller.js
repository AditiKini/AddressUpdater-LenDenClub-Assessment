import Address from "../model/addressSchema.js";
import User from "../model/userSchema.js";

export const addressStore = async (request, response) => {
    try {
        const { username, streetAddress, country, city, state, zipCode } = request.body;

        // Check if the address already exists for the user
        const existingAddress = await Address.findOne({streetAddress, country, city, state, zipCode });
        if (existingAddress) {
            return response.status(400).json({ message: 'Address already exists' });
        }
       
        // Create new address document and associate it with the user
        const addressData = {
            username: username,
            streetAddress: streetAddress, 
            country : country,
            city: city, 
            state: state, 
            zipCode: zipCode 
        };
        const newAddressDocument = new Address(addressData);
        //  const result  = new Address.insertOne(addressData);
        await newAddressDocument.save();

        response.status(200).json({ message: newAddressDocument });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}


export const getAllAddresses = async (request, response) => {
    try {
      const { username } = request.query; // fetches data from URL
        console.log(username); //for testing purpose
        const addresses = await Address.find({username : username});
        response.status(200).json(addresses);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

export const getAddressById = async (request, response) => {
    try {
        const { id } = request.params;
        const address = await Address.findById(id);

        if (!address) {
            return response.status(404).json({ message: 'Address not found' });
        }

        response.status(200).json(address);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export const updateAddress = async (request, response) => {
    try {
        const { id } = request.params;
        const { streetAddress, country, city, state, zipCode } = request.body;

        const updatedAddress = await Address.findByIdAndUpdate(id, { streetAddress, country, city, state, zipCode }, { new: true });

        if (!updatedAddress) {
            return response.status(404).json({ message: 'Address not found' });
        }

        response.status(200).json({ message: 'Address updated successfully', address: updatedAddress });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export const deleteAddress = async (request, response) => {
    try {
        const { id } = request.params;

        const deletedAddress = await Address.findByIdAndDelete(id);

        if (!deletedAddress) {
            return response.status(404).json({ message: 'Address not found' });
        }

        response.status(200).json({ message: 'Address deleted successfully', address: deletedAddress });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}