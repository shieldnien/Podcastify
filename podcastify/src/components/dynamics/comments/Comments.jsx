import db from "../../envs/CommentsDB"

export default function Comments() {
  return (
    <>
      <section>
        <article>
          <div className="flex flex-col mb-12 animate__animated animate__fadeInUp animate__faster animate__delay-1s">
            {Object.values(db).map((o) => {
              return (
                <>
                  <div className="max-w-xl py-4 px-4 bg-white shadow-lg rounded-lg mx-auto my-20">
                    <div className="flex justify-center md:justify-start -mt-16">
                      <img
                        className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
                        src={`https://unavatar.io/${o.name}`}
                        alt={`Avatar from ${o.name}`}
                      />
                    </div>
                    <div>
                      <p className="mt-2 text-gray-600">{o.comment}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                        {o.name}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </article>
      </section>
    </>
  );
}
