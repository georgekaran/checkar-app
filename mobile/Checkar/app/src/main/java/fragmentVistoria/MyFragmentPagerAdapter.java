package fragmentVistoria;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;

public class MyFragmentPagerAdapter extends FragmentPagerAdapter {
    private String[] tabsTitles;

    public MyFragmentPagerAdapter(@NonNull FragmentManager fm, int behavior, String[] tabs) {
        super(fm, behavior);
        this.tabsTitles = tabs;
    }

    @NonNull
    @Override
    public Fragment getItem(int position) {
        switch (position){
            case 0:
                return new FragmentDados();
            case 1:
                return new FragmentItens();
            case 2:
                return new FragmentEncerramento();
            default:
                return null;
        }
    }

    @Override
    public int getCount() {
        return this.tabsTitles.length;
    }

    @Nullable
    @Override
    public CharSequence getPageTitle(int position) {
        return this.tabsTitles[position];
    }
}
