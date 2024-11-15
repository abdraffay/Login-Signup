//GEt method
//Http//localhost:5000/userrole

const { UserRole } = require("../Models/userRole");


async function getUserRole(req, res) {

    const allRoles = await UserRole.find();
    return res.status(200).send(allRoles);


}
//POST method
//http//localhost:5000/userrole

async function postUserRole(req, res) {
    const { RoleName, Status } = req.body;

    const RoleName_Checker = /^(?!.*\s)[A-Za-z]{3,20}$/;
    const RoleStatus_Checker = /^("active"|"unactive")$/;

    (RoleName_Checker.test(RoleName)) ? "" : res.send({ message: "Role name mustn't contain spaces and special characters" })
        (RoleStatus_Checker.test(Status)) ? "" : res.send("Role status should only be active or unactive")

    const roleExists = await UserRole.findOne({ RoleName: RoleName.toLowerCase() })
    if (roleExists) {
        return res.send({ "message": "Role already exists" })
    }

    const newRole = await UserRole.create({
        RoleName: RoleName.toLowerCase(),
        Status: Status
    })

    return res.status(201).send({ "message": "Role Added Successfully", "data": req.body });

}


// @Method   DELETE
// @API      http://localhost:5000/userrole/:id
async function deleteUserRole(req, res) {
    const deleteRole_name = req.params.id.toLowerCase();
    const existingRole = await UserRole.findOne({ RoleName: deleteRole_name });

    if (existingRole) {
        const deleteRole = await UserRole.deleteOne({ RoleName: deleteRole_name });

        return res.send({ "message": "Role Deleted successfully!" })
    } else {

        return res.send("Role not available")
    }
}


// @Method   UPDATE
// @API      http://localhost:5000/userrole/:id
async function updateUserRole(req, res) {
    const { RoleName, Status } = req.body;

    const roleName_checker = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    const roleStatus_checker = /^(active|unactive)$/;
    // Validate roleName
    if (!roleName_checker.test(RoleName)) {
        return res.status(400).send({ message: "Invalid Role Name" });
    }

    // Validate roleStatus
    if (!roleStatus_checker.test(Status)) {
        return res.status(400).send({ message: "Invalid Role Status" });
    }
    const updateRole_name = req.params.id.toLowerCase();
    const existingRole = await UserRole.findOne({ RoleName: updateRole_name });

    if (existingRole) {
        const updateRole = await UserRole.updateOne(
            { RoleName: updateRole_name },
            { $set: { RoleName: RoleName.toLowerCase(), Status: Status } }
        );
        console.log(updateRole)
        return res.send({ "message": "Update role successfully" })
    } else {

        return res.send("Role not available")
    }

}
module.exports = { getUserRole, postUserRole, deleteUserRole, updateUserRole };