import React from 'react'
import NavBarCustomer from '../CustomerPage/NavBarCustomer'
import Footer from '../Footer'

export default function TermAndCondition() {

    const mainStyle = {
        marginTop: '90px',
        padding: '0 120px'
    }

    const contenAreaStyle = {
        padding: '0 100px'
    }

    const contentStyle = {
        marginBottom: '20px',
        lineHeight: '25px'
    }

    return (
        <div>
            <NavBarCustomer />
            <div style={mainStyle}>
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Term and Condition</h1>
                <h3 style={{ marginBottom: '20px' }}>
                    Welcome to our food ordering system! Before creating a new account, please carefully read and understand the
                    following terms and conditions that govern your use of our platform:
                </h3>

                <div style={contenAreaStyle}>
                    <p style={contentStyle}>
                        <strong>1. Account Creation : </strong><br />
                        By creating a new account on our food ordering system, you agree to provide accurate and complete
                        information during the registration process. You are responsible for maintaining the confidentiality of your account
                        credentials and for all activities that occur under your account.
                    </p>

                    <p style={contentStyle}>
                        <strong>2. Age Restriction : </strong><br />
                        You must be at least 18 years old to create an account on our platform. By creating an account,
                        you confirm that you meet the age requirement.
                    </p>

                    <p style={contentStyle}>
                        <strong>3.User Responsibilities : </strong><br />
                        As a user of our food ordering system, you agree to use the platform for lawful purposes only.
                        You shall not engage in any activities that violate applicable laws or infringe upon the rights of others.
                        You are responsible for the content you post, transmit, or share on the platform.
                    </p>

                    <p style={contentStyle}>
                        <strong>4.Food Orders : </strong><br />
                        Our platform allows you to place food orders from various restaurants. The availability of food items,
                        delivery times, and prices are subject to change without prior notice. We strive to provide accurate and up-to-date
                        information, but we cannot guarantee the availability or accuracy of the restaurant menus or pricing.
                    </p>

                    <p style={contentStyle}>
                        <strong>5.Payment and Refunds : </strong><br />
                        When placing food orders, you agree to pay the specified prices, including applicable taxes and
                        delivery fees. Payments can be made through the designated payment methods supported by our platform. Refunds may be
                        provided in accordance with our refund policy, which is available on our website.
                    </p>

                    <p style={contentStyle}>
                        <strong>6.Privacy and Data Protection : </strong><br />
                        We are committed to protecting your privacy and maintaining the security of your personal
                        information. Please refer to our Privacy Policy to understand how we collect, use, and safeguard your data.
                    </p>

                    <p style={contentStyle}>
                        <strong>7.Intellectual Property : </strong><br />
                        All intellectual property rights, including trademarks, logos, and content on our platform,
                        belong to us or our licensors. You are prohibited from using, reproducing, or distributing any intellectual property
                        without prior written permission.
                    </p>

                    <p style={contentStyle}>
                        <strong>8.Termination : </strong><br />
                        We reserve the right to suspend or terminate your account at our discretion if you violate these terms
                        and conditions or engage in any fraudulent or illegal activities. Upon termination, you will no longer have access to
                        your account and any pending orders may be canceled.
                    </p>

                    <p style={contentStyle}>
                        <strong>9.Disclaimer of Liability : </strong><br />
                        While we strive to provide a seamless and reliable food ordering experience, we do not
                        guarantee the accuracy, completeness, or timeliness of the information on our platform. We shall not be liable for any
                        direct, indirect, incidental, consequential, or punitive damages arising from your use of the platform or any errors or
                        disruptions in its operation.
                    </p>

                    <p style={contentStyle}>
                        <strong>10.Modification of Terms : </strong><br />
                        We may update or modify these terms and conditions from time to time. Any changes will be
                        effective upon posting on our platform. It is your responsibility to review the terms periodically, and continued use of
                        the platform constitutes acceptance of the updated terms.
                    </p>
                </div>

                <p style={contentStyle}>
                    By creating a new account on our food ordering system, you acknowledge that you have read, understood, and agreed to
                    these terms and conditions. If you do not agree with any part of these terms, please refrain from creating an account.
                </p>

                <p style={{marginBottom: '50px', lineHeight: '25px'}}>
                    If you have any questions or concerns regarding these terms and conditions, please contact our customer support team for assistance.
                    Thank you for choosing our food ordering system, and we look forward to serving you!
                </p>

            </div>
            <Footer />
        </div>
    )
}
