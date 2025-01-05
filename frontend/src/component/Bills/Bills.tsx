export default function Bills() {
    const services = [
        { name: "Recharge", path: "M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 1-2 -2v-14z M11 4h2" },
        { name: "Electricity", path: "M13 2L3 14h9l-1 8L21 10h-9l1-8z" },
        { name: "Gas", path: "M5 22V2m14 20V2m-7 18a7 7 0 0 1-7-7m14 0a7 7 0 0 1-7 7" },
        { name: "Railway", path: "M12 2v20m-7-5h14l-1 5H6l-1-5zm1-15h12M5 7l7 7 7-7" },
    ];

    const travel = [
        { name: "Bus", path: "M4 16l2 2v2h12v-2l2-2V8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v8zm4-2h8m-8-4h8" },
        { name: "Train", path: "M12 2v20m-7-5h14l-1 5H6l-1-5zm1-15h12M5 7l7 7 7-7" },
        { name: "Flight", path: "M10 10l8 4m-8-4V2l8 10-8 10v-8l-8-4z" },
    ];

    const billPayments = [
        { name: "Electricity", path: "M13 2L3 14h9l-1 8L21 10h-9l1-8z" },
        { name: "Mobile Postpaid", path: "M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2H6a2 2 0 0 1 -2 -2V5a2 2 0 0 1 2 -2zM9 18h6" },
        { name: "Credit Card Bill", path: "M3 7h18M3 11h18m-16 4h14" },
        { name: "Loan Repayment", path: "M16 3h5v5M3 16h5v5M21 3l-9 9M12 12L3 21" },
        { name: "Gas Cylinder", path: "M6 2h12a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2H6a2 2 0 0 1 -2 -2V4a2 2 0 0 1 2 -2zm4 15h4m-2 -1v4" },
        { name: "Insurance Premium", path: "M12 2l10 6v6a10 10 0 0 1 -20 0V8l10 -6z" },
        { name: "Piped Gas", path: "M3 5h18M6 8h12v9H6V8zm3 3h6" },
        { name: "Water Bill", path: "M12 2a6 6 0 0 1 6 6c0 6-6 14-6 14S6 14 6 8a6 6 0 0 1 6-6z" },
        { name: "Landline", path: "M6 3h12a2 2 0 0 1 2 2v5H4V5a2 2 0 0 1 2-2zm12 10H6v5h12v-5zm-4 4h-4" },
        { name: "Broadband", path: "M4 8h16M8 8v8M16 8v8M12 16v5" },
        { name: "Municipal Tax", path: "M3 10h18M6 3h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2H6a2 2 0 0 1 -2 -2V5a2 2 0 0 1 2 -2z" },
        { name: "Subscriptions", path: "M4 4h16M4 20h16m-12-8h8" },
        { name: "Cable TV", path: "M12 3h6a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-6v8h-2v-8H6a2 2 0 0 1 -2 -2V5a2 2 0 0 1 2 -2h6z" },
        { name: "Education Fees", path: "M3 10l9 5 9-5-9-5zM3 10v6a9 9 0 0 0 18 0v-6" },
    ];

    return (
        <div className="h-screen bg-sky-800 p-6 overflow-auto">
            <div className="rounded-xl bg-white p-6 shadow-lg space-y-8">
                {/* Utilities Section */}
                <div>
                    <h1 className="text-2xl font-bold text-sky-800 mb-6">Pay Your Bills</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {services.map((service) => (
                            <Icon key={service.name} d={service.path} text={service.name} />
                        ))}
                    </div>
                </div>

                {/* Travel Section */}
                <div>
                    <h1 className="text-2xl font-bold text-sky-800 mb-6">Travel</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        {travel.map((item) => (
                            <Icon key={item.name} d={item.path} text={item.name} />
                        ))}
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-sky-800 mb-6">Payments</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        {billPayments.map((item) => (
                            <Icon key={item.name} d={item.path} text={item.name} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Icon(props: any) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300 bg-gray-100">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                width={36}
                height={36}
                strokeWidth={2}
                className="text-sky-800"
            >
                <path d={props.d}></path>
            </svg>
            <div className="text-sm font-medium text-gray-800">{props.text}</div>
        </div>
    );
}
