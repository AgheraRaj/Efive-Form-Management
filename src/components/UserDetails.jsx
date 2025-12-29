

const UserDetails = ({ profile }) => {
    return (
        <>
            <h3 className="text-[#4eb7eb] font-medium">
                Basic Details
            </h3>

            <div className="border-t border-gray-300 my-2" />

            <div className="grid grid-cols-5 gap-y-4 text-sm pb-1">
                {profile.email && (
                    <div>
                        <p className="font-medium">Email:</p>
                        <p>{profile.email}</p>
                    </div>
                )}

                {profile.contactNo && (
                    <div>
                        <p className="font-medium">Contact No.:</p>
                        <p>{profile.contactNo}</p>
                    </div>
                )}

                {profile.gender && (
                    <div>
                        <p className="font-medium">Gender:</p>
                        <p>{profile.gender}</p>
                    </div>
                )}

                {profile.validFrom && (
                    <div>
                        <p className="font-medium">Valid From:</p>
                        <p>{profile.validFrom}</p>
                    </div>
                )}

                {profile.validTo && (
                    <div>
                        <p className="font-medium">Valid To:</p>
                        <p>{profile.validTo}</p>
                    </div>
                )}

                {profile.role && (
                    <div>
                        <p className="font-medium">Role:</p>
                        <p>{profile.role}</p>
                    </div>
                )}

                <div>
                    <p className="font-medium">Language:</p>
                    <p>English</p>
                </div>

            </div>
        </>
    )
}

export default UserDetails
