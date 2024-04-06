import { redirect } from 'next/navigation';
import SearchBox from './SearchBox';
import RecentProfiles from '@/models/RecentProfiles';
import connectDb from '@/lib/connectDb';
import Link from 'next/link';
import GridContainer from '@/components/GridContainer';

export default async function Home() {
    await connectDb();
    const recenetProfiles = await RecentProfiles.find({}).sort({ updatedAt: 'desc' }).limit(8);

    const formAction = async formData => {
        'use server';
        const username = formData.get('username');
        redirect(`/${username}`);
    };

    return (
        <main className="px-4">
            <div className="mx-auto max-w-screen-md pt-[15vh] text-center md:pt-[16vh]">
                <h1 className="text-gradient text-4xl font-bold md:text-7xl">Git Glance</h1>
                <p className="text-gradient mb-16 mt-2 text-xl font-medium md:text-3xl ">
                    Visualize Your GitHub Profile
                </p>

                <SearchBox formAction={formAction} />
            </div>

            {/* <div className="mx-auto mt-28 max-w-screen-xl text-left md:mt-40">
                <h2 className="text-gradient text-xl font-semibold md:text-3xl">Recent Profiles</h2>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
                    {recenetProfiles.map(profile => (
                        <Link
                            key={profile._id}
                            href={`/${profile.username}`}
                            className="box grid grid-cols-[3rem_1fr] items-center gap-5 text-left"
                        >
                            <img
                                src={profile.avatarUrl}
                                // src="https://github.com/devxprite.png"
                                alt={profile.username}
                                className="mx-auto size-12 rounded-full"
                            />
                            <div>
                                <p className="text-base font-semibold md:text-lg">{profile.name ?? profile.username}</p>
                                <p className="text-sm text-gray-400 md:text-base">@{profile.username}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div> */}
            <div className="mx-auto mt-32 max-w-screen-xl md:mt-36">
                <GridContainer
                    className={'grid-cols-1 gap-3 md:grid-cols-4'}
                    name={'Recent Profiles'}
                    description={'Profiles that have been viewed recently'}
                >
                    {recenetProfiles.map(profile => (
                        <Link
                            key={profile._id}
                            href={`/${profile.username}`}
                            className="box flex items-center gap-3 md:gap-5 text-left"
                        >
                            <img
                                src={profile.avatarUrl}
                                alt={profile.username}
                                className="grow-0 size-10 smd:ize-12 rounded-full"
                            />
                            <div>
                                <p className="text-base font-semibold md:text-lg">{profile.name ?? profile.username}</p>
                                <p className="text-sm text-gray-400 md:text-base">@{profile.username}</p>
                            </div>
                        </Link>
                    ))}
                </GridContainer>
            </div>
        </main>
    );
}
