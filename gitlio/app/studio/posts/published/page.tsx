import Navbar from '@/components/studio/StdNavbar';
import Sidebar from '@/components/studio/StdSidebar';
import PostList from '@/components/studio/post/PostList';
import PostMenu from '@/components/studio/post/PostMenu';

export default function PostPage() {
  return (
    <>
      <PostMenu />
      <div className="flex-1 p-4">
        <PostList />
      </div>
    </>
  );
}
