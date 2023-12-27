const asyncHandler = require("express-async-handler");
const Contact = require("../models/contact_modal");
const { constacts } = require("../constant");  


//@desc Get all contacts
//@route GET /contacts
//@access private

const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(201).json({ message: "Get All Contact", data: contacts });
});

//@desc Get all contacts
//@route GET /contacts/:id
//@access private

const getSingleContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error(`No data found for ${req.params.id}`);
    }
    res.status(201).json({ message: "Contact found", data: contact });
});

//@desc Post create contacts
//@route POST /contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw Error("All fields are mendetory");
    }

    const contact = await Contact.create(
        {
            name,
            email,
            phone,
            user_id: req.user.id
        }
    );
    res.status(201).json({ message: "Contact created", data: contact });
});


//@desc Update contacts
//@route PUT /contacts/:id
//@access private

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    console.log(`contact update ${contact}`);
    if (!contact) {
        res.status(404);
        throw new Error(`No data found for ${req.params.id}`);
    }

    if (contact.user_id != req.user.id) {
        res.status(403);
        throw new Error(`User cant not delete contact created by other`);
    }

    const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(201).json({
        message: `Contact updated for ${req.params.id}`,
        data: req.body
    });

});

//@desc Update contacts
//@route DELETE /contacts/:id
//@access private

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error(`No data exist for ${req.params.id}`);
    }
    
    if (contact.user_id != req.user.id) {
        res.status(403);
        throw new Error(`User cant not delete contact created by other`);
    }

    await Contact.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: `Contact deleted for ${req.params.id}`, data: contact});
}); 


module.exports = { getContact, createContact, updateContact, deleteContact, getSingleContact };