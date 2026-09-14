import type { SacramentMeeting } from "@/lib/types";

export default function MeetingDetail({
    id,
    date,
    meetingType,
    presiding,
    conducting,
    announcements = [],
    openingHymn,
    openingPrayer,
    wardBusiness,
    stakeBusiness,
    sacramentHymn,
    speakers,
    closingHymn,
    closingPrayer,
}: SacramentMeeting) {
    const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        },
    );

    return (
        <main className="mx-auto max-w-4xl p-4">
            <header className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-brand">
                    {meetingType} meeting
                </p>

                <h1 className="mt-2 text-3xl font-bold">Sacrament Meeting</h1>

                <p className="mt-2 text-lg">{formattedDate}</p>
                <p className="text-sm text-foreground/70">Meeting #{id}</p>

                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                        <dt className="font-semibold text-brand">Presiding</dt>
                        <dd>{presiding}</dd>
                    </div>

                    <div>
                        <dt className="font-semibold text-brand">Conducting</dt>
                        <dd>{conducting}</dd>
                    </div>
                </dl>
            </header>

            <section className="rounded-2xl border border-card/60 bg-card/20 p-6 shadow-md">
                <h2 className="mb-5 text-2xl font-bold">Meeting Program</h2>

                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-brand">Opening Hymn</h3>
                        <p>
                            #{openingHymn.number} &ldquo;{openingHymn.title}&rdquo;
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-brand">Opening Prayer</h3>
                        <p>{openingPrayer}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-brand">Sacrament Hymn</h3>
                        <p>
                            #{sacramentHymn.number} &ldquo;{sacramentHymn.title}&rdquo;
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-brand">Closing Hymn</h3>
                        <p>
                            #{closingHymn.number} &ldquo;{closingHymn.title}&rdquo;
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-brand">Closing Prayer</h3>
                        <p>{closingPrayer}</p>
                    </div>
                </div>
            </section>

            {announcements.length > 0 && (
                <section className="mt-6 rounded-2xl border border-card/60 bg-card/20 p-6 shadow-md">
                    <h2 className="mb-4 text-2xl font-bold">Announcements</h2>

                    <ul className="list-disc space-y-2 pl-5">
                        {announcements.map((announcement) => (
                            <li key={announcement}>{announcement}</li>
                        ))}
                    </ul>
                </section>
            )}

            <section className="mt-6 rounded-2xl border border-card/60 bg-card/20 p-6 shadow-md">
                <h2 className="mb-4 text-2xl font-bold">Business</h2>

                {wardBusiness.length > 0 && (
                    <div>
                        <h3 className="font-semibold text-brand">Ward Business</h3>

                        <ul className="mt-2 list-disc space-y-2 pl-5">
                            {wardBusiness.map((item) => (
                                <li key={item.description}>{item.description}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {stakeBusiness && (
                    <p className={wardBusiness.length > 0 ? "mt-4" : ""}>
                        <span className="font-semibold text-brand">Stake Business:</span>{" "}
                        Included in this meeting
                    </p>
                )}

                {wardBusiness.length === 0 && !stakeBusiness && (
                    <p>No business items for this meeting.</p>
                )}
            </section>

            <section className="mt-6 rounded-2xl border border-card/60 bg-card/20 p-6 shadow-md">
                <h2 className="mb-4 text-2xl font-bold">Speakers and Music</h2>

                {speakers.length > 0 ? (
                    <ul className="space-y-4">
                        {speakers.map((item) => (
                            <li key={`${item.type}-${item.name}-${item.topic}`}>
                                <p className="font-semibold text-brand">
                                    {item.type === "musical-number"
                                        ? "Musical Number"
                                        : "Speaker"}
                                </p>

                                <p>{item.name}</p>

                                {item.topic && (
                                    <p className="text-sm text-foreground/75">
                                        {item.topic}
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No speakers or musical numbers listed.</p>
                )}
            </section>
        </main>
    );
}