import { AccountCircleIcon } from "@/components/icons";
import { UserInfo } from "@/components/ui/user/UserInfo";

import styles from "@/styles/pages/office/account/Account.module.css";

export const AccountTemplate = () => (
  <div className="officePage">
    <h2 className="officePageTitle">Учетная запись</h2>
    <div className="officePageContent">
      <div className={styles.avatarContainer}>
        <AccountCircleIcon
          sx={{
            width: "80px",
            height: "80px",
            color: "#1b2f52"
          }}
        />
        <div className={styles.userInfoWrapper}>
          <UserInfo />
        </div>
      </div>
      {/* <AccountForm /> */}
      {/* <ChangePasswordForm /> */}
    </div>
  </div>
);
