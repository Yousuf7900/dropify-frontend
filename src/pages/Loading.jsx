const Loading = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center gap-6 bg-base-100 z-9999">
            <div className="relative">
                <span className="loading loading-ring loading-lg text-indigo-500"></span>
            </div>

            <p className="text-gray-500 text-sm">
                Preparing Dropify experience…
            </p>
        </div>
    );
};

export default Loading;
